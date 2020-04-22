import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Offer } from '@app/core';
import { NearbyOfferFacade } from '../facade';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Iindex } from '@app/meed-extras/models/meed-extra';

@Component({
  selector: 'nearby-offer',
  templateUrl: './nearby-offer.page.html',
  styleUrls: ['./nearby-offer.page.scss']
})
export class NearbyOfferPage implements OnInit {
  zipOfferForm: FormGroup;
  offers$: Observable<[[Iindex | Offer]]>;
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
  constructor(private formBuilder: FormBuilder, public nearbyOfferFacade: NearbyOfferFacade, private router: Router) {}

  async ngOnInit() {
    this.zipOfferForm = this.formBuilder.group({
      zipCode: ['', Validators.compose([Validators.required, Validators.maxLength(5)])]
    });
  }

  async ionViewWillEnter() {
    this.offers$ = await this.nearbyOfferFacade.findLocalOffer();
  }

  findOffers(zipCode: number) {
    this.offers$ = this.nearbyOfferFacade.findOffers(zipCode);
  }

  setOffer(offer: Offer) {
    this.nearbyOfferFacade.setOffer(offer);
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
