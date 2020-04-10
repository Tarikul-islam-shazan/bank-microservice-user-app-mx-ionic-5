import { Injectable, Inject, InjectionToken, Injector } from '@angular/core';
import { AnalyticsProvider } from '../models';
import { FirebaseAnalyticsProvider } from '../providers';
import { AnalyticsConfig } from '../analytics.module';
import { Logger } from '../../core/services/logger.service';
const log = new Logger('AnaltyicsService');
export const ANALYTICS_PROVIDER = new InjectionToken<AnalyticsConfig>('analytics.provider');

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  /**
   *  Analytics Provider interface
   *
   * @private
   * @type {AnalyticsProvider}
   * @memberof AnalyticsService
   */
  private readonly provider: AnalyticsProvider = null;

  /**
   * Creates an instance of AnalyticsService.
   *
   * @param {string} providerType
   * @memberof AnalyticsService
   */
  constructor(@Inject(ANALYTICS_PROVIDER) private analyticsConfig, private injector: Injector) {
    log.info(`analytics provider ${analyticsConfig.providerName}`);
    if (analyticsConfig.providerName === 'firebase') {
      FirebaseAnalyticsProvider.injector = this.injector;
      this.provider = new FirebaseAnalyticsProvider();
    }
  }

  /**
   *  Sets the userid, so that user can be tracked
   *
   * @param {string} id
   * @memberof AnalyticsService
   */
  setUserId(id: string): void {
    this.provider.setUserId(id);
  }
  setUserProperty(name: string, value: string): void {
    this.provider.setUserProperty(name, value);
  }

  /**
   *  Sets the current screen name, so user activity can be associated with a particular screen.
   *
   * @param {string} name
   * @memberof AnalyticsService
   */
  setCurrentScreenName(name: string): void {
    this.provider.setCurrentScreenName(name);
  }

  /**
   *
   *
   * @param {boolean} isEnabled
   * @memberof AnalyticsService
   */
  setAnalyticsEnabled(isEnabled: boolean): void {
    this.provider.setAnalyticsEnabled(isEnabled);
  }

  /**
   *
   *
   * @param {*} event
   * @memberof AnalyticsService
   */
  logEvent(event: any, params?: any): void {
    log.info(`[event: ${event} , params: ${params ? JSON.stringify(params) : 'empty'}]`);
    this.provider.logEvent(event, params);
  }
}
