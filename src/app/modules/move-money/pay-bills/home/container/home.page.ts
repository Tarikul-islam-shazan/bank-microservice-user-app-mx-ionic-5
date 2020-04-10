import { Component } from '@angular/core';
import { PayBillsHomeFacade as Facade } from '@app/move-money/pay-bills/home/facade/facade';
@Component({
  selector: 'pay-bills-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class PayBillsHomePage {
  constructor(public facade: Facade) {}
}
