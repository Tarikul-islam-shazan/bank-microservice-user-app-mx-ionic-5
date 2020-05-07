import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category, Offer, OfferDetails } from './../../core/models';
import { Logger } from './../../core/services/logger.service';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '@env/environment';
import { map, shareReplay } from 'rxjs/operators';
import { AllOfferParams, OfferDetailsParams, ActiveOfferParams, CategoriesOfferParams } from '../models/meed-extra';
import { HeaderService } from '@app/core/services/header-service.service';

const logger = new Logger('MeedExtraService');

@Injectable()
export class MeedExtraService {
  private baseUrl = environment.serviceUrl;
  private baseUrlAffinity = this.baseUrl + '/offers/';
  private _category: Category;
  private offer$: Offer;
  featuredOffers$: Observable<Offer[]>;
  allOffers$: Observable<Offer[]>;
  categories$: Observable<Category[]>;
  constructor(private http: HttpClient, private headerService: HeaderService) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.baseUrlAffinity + 'categories', {
        headers: this.headerService.getUserNameMemberICustomerIdHeader()
      })
      .pipe(
        map((categories: Category[]) => {
          return categories.filter((category: Category) => {
            return category.name !== 'Travel';
          });
        })
      );
  }

  getFeaturedOffer(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.baseUrlAffinity + 'featured', {
      headers: this.headerService.getUserCustomerIdHeader()
    });
  }

  getOffers(apiParms: AllOfferParams | CategoriesOfferParams): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.baseUrlAffinity, {
      headers: this.headerService.getUserCustomerIdHeader(),
      params: { ...apiParms }
    });
  }

  getOfferDetails(apiParms: OfferDetailsParams): Observable<OfferDetails> {
    return this.http.get<any>(`${this.baseUrlAffinity}${apiParms.xid}`, {
      headers: this.headerService.getUserCustomerIdHeader(),
      params: { ...apiParms }
    });
  }

  activeOffer(apiParms: ActiveOfferParams): Observable<Offer> {
    return this.http.post<Offer>(`${this.baseUrlAffinity}${apiParms.offerId}/activate`, {
      headers: this.headerService.getUserCustomerIdHeader(),
      params: { ...apiParms }
    });
  }

  /**
   * This @method searchOffer return offers
   * Issue: MM2-237
   * Details: typing interrupted by "Please wait" pop up.
   * Here we add skip-loader extra header to it for skipping loading
   * which actually skip LoaderInterceptor loading
   * @param {*} [apiParms={}]
   * @returns {Observable<Offer[]>}
   * @memberof MeedExtraService
   */
  searchOffer(apiParms: any = {}): Observable<Offer[]> {
    const headers: HttpHeaders = this.headerService.getUserCustomerIdHeader().set('skip-loader', '');
    return this.http.get<Offer[]>(this.baseUrlAffinity, {
      headers,
      params: { ...apiParms }
    });
  }

  get featuredOffers(): Observable<Offer[]> {
    if (!this.featuredOffers$) {
      this.featuredOffers$ = this.getFeaturedOffer().pipe(shareReplay(1));
    }
    return this.featuredOffers$;
  }

  get categories(): Observable<Category[]> {
    if (!this.categories$) {
      this.categories$ = this.getCategories().pipe(shareReplay(1));
    }
    return this.categories$;
  }

  getallOffers(apiParms: AllOfferParams | CategoriesOfferParams): Observable<Offer[]> {
    if (!this.allOffers$) {
      this.allOffers$ = this.getOffers(apiParms).pipe(shareReplay(1));
    }
    return this.allOffers$;
  }

  set offer(offer: Offer) {
    this.offer$ = offer;
  }

  get offer(): Offer {
    return this.offer$;
  }

  set category(category: Category) {
    this._category = category;
  }

  get category(): Category {
    return this._category;
  }
}
