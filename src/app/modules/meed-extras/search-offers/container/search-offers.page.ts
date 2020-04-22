import { Component, OnInit } from '@angular/core';
import { SearchOffersFacade } from '../facade';
import { Observable } from 'rxjs';
import { Category, Offer } from '@app/core';

@Component({
  selector: 'search-offers',
  templateUrl: './search-offers.page.html',
  styleUrls: ['./search-offers.page.scss']
})
export class SearchOffersPage implements OnInit {
  categories$: Observable<Category[]>;
  constructor(public searchOffersFacade: SearchOffersFacade) {}

  ngOnInit() {
    this.searchOffersFacade.clearSearch();
  }

  ionViewWillEnter() {
    this.categories$ = this.searchOffersFacade.loadCategory();
  }

  /**
   * @summary sets offer and navigates to the offer's page
   *
   * @param {Offer} offer
   * @returns {void}
   * @memberOf SearchOffersPage
   */
  goToOfferPage(offer: Offer): void {
    this.searchOffersFacade.setOffer(offer);
  }

  /**
   * @summary opens filter modal
   *
   * @param {string} type
   * @param {Category[]} [categories=[]]
   * @returns {void}
   * @memberOf SearchOffersPage
   */
  openFilterModal(type: string, categories: Category[] = []): void {
    if (type === 'type') {
      this.searchOffersFacade.openFilterModal(type, []);
    } else {
      this.searchOffersFacade.openFilterModal(type, categories);
    }
  }
}
