import { Component, OnInit } from '@angular/core';
import { CardPinFacade } from '../facade';

@Component({
  selector: 'app-card-pin',
  templateUrl: './card-pin.page.html',
  styleUrls: ['./card-pin.page.scss']
})
export class CardPinPage implements OnInit {
  constructor(public cardPinFacade: CardPinFacade) {}

  ngOnInit(): void {}
}
