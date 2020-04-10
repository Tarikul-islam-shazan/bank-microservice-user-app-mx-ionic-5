import { Component, OnInit } from '@angular/core';
import { BillerDirectFacade } from '@app/move-money/pay-bills/biller-direct/facade/facade';

@Component({
  selector: 'biller-direct',
  templateUrl: './biller-direct.page.html',
  styleUrls: ['./biller-direct.page.scss']
})
export class BillerDirectPage implements OnInit {
  constructor(public billerDirectFacade: BillerDirectFacade) {}
  ngOnInit() {
    this.billerDirectFacade.createToken();
  }
}
