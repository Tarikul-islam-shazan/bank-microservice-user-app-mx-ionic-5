import { Component, OnInit } from '@angular/core';
import { CardSwapFacade } from '@app/move-money/pay-bills/card-swap/facade/facade';

@Component({
  selector: 'card-swap',
  templateUrl: './card-swap.page.html',
  styleUrls: ['./card-swap.page.scss']
})
export class CardSwapPage implements OnInit {
  constructor(public cardSwapFacade: CardSwapFacade) {}

  ngOnInit() {
    this.cardSwapFacade.createToken();
  }
}
