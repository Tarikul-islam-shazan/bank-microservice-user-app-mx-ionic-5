/**
 * Facade: categories offer facade
 * Details: get categories offers
 * Date: February 20th, 2020
 * Developer: Sudipta <sudipta.ghosh@bs-23.net>
 */
import { Injectable } from '@angular/core';
import { MeedExtraService } from '../../services/meed-extra.service';
import { Offer, Category } from '@app/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Iindex } from '@app/meed-extras/models/meed-extra';
import { AlphabiticalSortService } from '@app/meed-extras/services';

/**
 *
 *
 * @export
 * @class CategoriesOfferFacade
 */
@Injectable()
export class CategoriesOfferFacade {
  public categoriesOffers$: Observable<[[Iindex | Offer]]>;
  constructor(
    private meedExtraService: MeedExtraService,
    private router: Router,
    private alphabiticalSortService: AlphabiticalSortService
  ) {
    this.categoriesOffers$ = this.loadCategoriesOffer();
  }

  /**
   * load categories offers
   *
   * @returns {(Observable<[[Iindex | Offer]]>)}
   * @memberof CategoriesOfferFacade
   */
  loadCategoriesOffer(): Observable<[[Iindex | Offer]]> {
    const params = {
      categoryid: this.meedExtraService.category.id as string,
      page: '1',
      per_page: '1000'
    };
    return this.meedExtraService.getOffers(params).pipe(
      map((offers: Offer[]) => {
        return this.alphabiticalSortService.sortOfferList(offers);
      })
    );
  }

  get category(): Category {
    return this.meedExtraService.category;
  }

  setOffer(offer: Offer): void {
    this.meedExtraService.offer = offer;
    if (offer.shopType === 'online') {
      this.router.navigate(['/meed-extras/online-offer']);
    } else if (offer.shopType === 'instore') {
      this.router.navigate(['/meed-extras/instore-offer']);
    }
  }
}
