import { Component, OnInit, ViewChild } from '@angular/core';
import { Offer } from '@app/core';
import { CategoriesOfferFacade } from '../facade';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'categories-offer',
  templateUrl: './categories-offer.page.html',
  styleUrls: ['./categories-offer.page.scss']
})
export class CategoriesOfferPage implements OnInit {
  @ViewChild(IonContent, { static: false }) private content: IonContent;
  alphabets = [
    '#',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ];
  constructor(public categoriesOfferFacade: CategoriesOfferFacade, private router: Router) {}

  ngOnInit() {}

  goToSearchPage() {
    this.router.navigate(['/meed-extras/search-offers']);
  }

  setOffer(offer: Offer) {
    this.categoriesOfferFacade.setOffer(offer);
  }

  // perform scrolling
  scrollTo(element: string) {
    if (document.getElementById(element)) {
      const yOffset = document.getElementById(element).offsetTop;
      this.content.scrollToPoint(0, yOffset, 1000);
    }
  }
}
