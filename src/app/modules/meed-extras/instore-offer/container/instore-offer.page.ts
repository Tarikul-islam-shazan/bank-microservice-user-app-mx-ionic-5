import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstoreOfferFacade } from '../facade';
import { OfferDetails } from '@app/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'mbc-instore-offer',
  templateUrl: './instore-offer.page.html',
  styleUrls: ['./instore-offer.page.scss']
})
export class InstoreOfferPage implements OnInit {
  zipOfferForm: FormGroup;
  public offerDetails$: Observable<OfferDetails>;
  constructor(private formBuilder: FormBuilder, public instoreOfferFacade: InstoreOfferFacade) {}

  ngOnInit() {
    this.zipOfferForm = this.formBuilder.group({
      zipCode: ['', Validators.compose([Validators.required, Validators.maxLength(5)])]
    });
  }

  ionViewWillEnter() {
    this.getOffers();
  }

  search(value) {
    this.zipOfferForm.reset();
    this.getOffers(value.zipCode);
  }

  getOffers(zipCode: string = '') {
    this.offerDetails$ = this.instoreOfferFacade.loadOfferDetails(zipCode);
  }

  activeOffer() {
    this.instoreOfferFacade.activeOffer();
  }
}
