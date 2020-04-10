import { Component, OnInit } from '@angular/core';
import { SearchOffersFacade } from '../facade';
import { Observable } from 'rxjs';
import { Category } from '@app/core';

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

  goToofferPage(offer) {
    this.searchOffersFacade.setOffer(offer);
  }

  openFilterModal(type: string, categories: Category[] = []) {
    if (type === 'type') {
      this.searchOffersFacade.openFilterModal(type, []);
    } else {
      this.searchOffersFacade.openFilterModal(type, categories);
    }
  }
}
