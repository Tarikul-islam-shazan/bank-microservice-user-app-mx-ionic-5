import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { AnalyticsService } from '@app/analytics';
import { Logger } from './logger.service';
import { IdlenessService } from '@app/core/services/idleness.service';
import { PAGES } from '@app/core/models/constants';
const log = new Logger('RouteListenerService');
/**
 *  Class which is responsible for primarily listening to route events and
 * sending analytics data based on the current screen being visited.
 *
 * @export
 * @class RouteListenerService
 */
@Injectable({
  providedIn: 'root'
})
export class RouteListenerService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private analyticService: AnalyticsService,
    private idlenessService: IdlenessService
  ) {
    log.info(`constructor`);
    this.currentUrl = this.router.url;
    this.listenRouteEvent(this.router);
  }
  private previousUrl: string;
  private currentUrl: string;
  static stringUpperCaseFirst(pageTitle: string) {
    if (!pageTitle) {
      return pageTitle;
    }
    return pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1);
  }

  public getPreviousUrl(): string {
    return this.previousUrl;
  }

  /**
   *
   * App router event listener, we need the page title from router for setCurrentScreenName.
   * pass the page title from router data.title.
   * if title missing, this function we set the title based on router path
   * @param {Router} router
   * @memberof AnalyticsService
   */
  listenRouteEvent(router: Router) {
    log.info(`initializing listener service`);
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        tap(event => {
          log.info(`got event in route listener`);
          if (event instanceof NavigationEnd) {
            this.previousUrl = this.currentUrl;
            this.currentUrl = event.url;
          }
        }),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        map(route => route.snapshot),
        map(snapshot => {
          if (snapshot.data.title) {
            if (snapshot.paramMap.get('id') !== null) {
              log.info(`found title with id ${snapshot.data.title}`);
              return `${snapshot.data.title} > ${snapshot.paramMap.get('id')}`;
            }
            log.info(`found title without id ${snapshot.data.title}`);
            return snapshot.data.title;
          } else {
            // if Router title missing, we can set the title based on router path

            return router.url.split('/').reduce((initialValue, currentValue) => {
              if (initialValue && currentValue) {
                initialValue += ' > ';
              }
              const retValue = initialValue + RouteListenerService.stringUpperCaseFirst(currentValue);
              log.info(`title did not exist using ${retValue} instead`);
              return retValue;
            });
          }
        })
      )
      .subscribe(pathString => {
        this.manageBaseAppIdelness(router.url);
        log.info(`got pagename as ${pathString}`);
        this.analyticService.setCurrentScreenName(pathString);
      });
  }

  manageBaseAppIdelness(currentRoute: string): void {
    switch (currentRoute) {
      case PAGES.LOGIN_USER.ROUTE_PATH:
      case PAGES.SIGNUP_EMAIL.ROUTE_PATH:
        this.idlenessService.stopBaseIdelTimeout();
        break;
      default:
        this.idlenessService.startBaseIdleTimeout();
        break;
    }
  }
}
