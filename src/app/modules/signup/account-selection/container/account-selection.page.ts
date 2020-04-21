import { Component, OnInit } from '@angular/core';
import { AccountSelectionFacade } from '../facade/account-selection-facade';

@Component({
  selector: 'mbc-account-selection',
  templateUrl: './account-selection.page.html',
  styleUrls: ['./account-selection.page.scss']
})
export class AccountSelectionPage implements OnInit {
  constructor(public facade: AccountSelectionFacade) {}

  ngOnInit() {}
}
