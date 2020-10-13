import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardDetailsFacade } from '../facade';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.page.html',
  styleUrls: ['./card-details.page.scss']
})
export class CardDetailsPage implements OnInit {
  cardImgSrc: string;
  debitCardNumber: string;

  constructor(private router: Router, public cardDetailsFacade: CardDetailsFacade) {}

  ngOnInit(): void {
    this.cardDetailsFacade.getCardDetails();
    this.cardImgSrc = 'assets/img/Card.png';
  }

  getCardNumber(cardNumber: string) {
    return '****  ****  **** ' + cardNumber.substring(cardNumber.length - 4);
  }

  navigateToPage(pageToNavigate: string): void {
    this.router.navigate([`more/${pageToNavigate}`]);
  }
}
