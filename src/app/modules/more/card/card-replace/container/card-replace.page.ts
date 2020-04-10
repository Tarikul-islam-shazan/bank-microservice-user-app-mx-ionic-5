import { Component, OnInit } from '@angular/core';
import { CardReplaceFacade } from '../facade';

@Component({
  selector: 'app-card-replace',
  templateUrl: './card-replace.page.html',
  styleUrls: ['./card-replace.page.scss']
})
export class CardReplacePage implements OnInit {
  constructor(public cardReplaceFacade: CardReplaceFacade) {}

  ngOnInit(): void {}
}
