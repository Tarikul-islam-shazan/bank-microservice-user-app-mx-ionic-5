import { Component, OnInit } from '@angular/core';
import { DirectDepositSetupFacade } from '../facade';
@Component({
  selector: 'mbc-direct-deposit-setup',
  templateUrl: './direct-deposit-setup.page.html',
  styleUrls: ['./direct-deposit-setup.page.scss']
})
export class DirectDepositSetupPage implements OnInit {
  constructor(public facade: DirectDepositSetupFacade) {}

  ngOnInit() {}
}
