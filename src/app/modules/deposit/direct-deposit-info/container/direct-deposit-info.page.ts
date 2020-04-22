import { Component, OnInit } from '@angular/core';
import { DirectDepositFacade } from '@app/deposit/direct-deposit-info/facade';
@Component({
  selector: 'app-direct-deposit-info',
  templateUrl: './direct-deposit-info.page.html',
  styleUrls: ['./direct-deposit-info.page.scss']
})
export class DirectDepositInfoPage implements OnInit {
  constructor(public directDepositFacade: DirectDepositFacade) {}
  ngOnInit() {}
}
