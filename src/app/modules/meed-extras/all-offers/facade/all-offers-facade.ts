import { Injectable } from '@angular/core';
import { MeedExtraService } from '../../services/meed-extra.service';
import { Offer } from '@app/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Iindex } from '@app/meed-extras/models/meed-extra';
import { AlphabiticalSortService } from '@app/meed-extras/services';

@Injectable()
export class AllOffersFacade {
  offers$: Observable<[[Iindex | Offer]]>;
  constructor(
    private meedExtraService: MeedExtraService,
    private router: Router,
    private alphabiticalSortService: AlphabiticalSortService
  ) {
    this.offers$ = this.loadOffers();
  }

  setOffer(offer: Offer): void {
    this.meedExtraService.offer = offer;
    if (offer.shopType === 'online') {
      this.router.navigate(['/meed-extras/online-offer']);
    } else if (offer.shopType === 'instore') {
      this.router.navigate(['/meed-extras/instore-offer']);
    }
  }

  loadOffers(): Observable<[[Iindex | Offer]]> {
    const params = {
      sort: 'partname',
      sortorder: 'asc',
      per_page: '10000'
    };
    return this.meedExtraService.getallOffers(params).pipe(
      map((offers: Offer[]) => {
        return this.alphabiticalSortService.sortOfferList(offers);
      })
    );
  }
}
