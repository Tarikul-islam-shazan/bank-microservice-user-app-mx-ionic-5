import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { AllOffersFacade } from '../facade';
import { Router } from '@angular/router';

@Component({
  selector: 'all-offers',
  templateUrl: './all-offers.page.html',
  styleUrls: ['./all-offers.page.scss']
})
export class AllOffersPage implements OnInit {
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
  constructor(public allOffersFacade: AllOffersFacade, private router: Router) {}

  ngOnInit() {}

  goToOfferPage(offer) {
    this.allOffersFacade.setOffer(offer);
  }

  goToSearchPage() {
    this.router.navigate(['/meed-extras/search-offers']);
  }

  scrollTo(element: string) {
    if (document.getElementById(element)) {
      const yOffset = document.getElementById(element).offsetTop;
      this.content.scrollToPoint(0, yOffset, 1000);
    }
  }
}
