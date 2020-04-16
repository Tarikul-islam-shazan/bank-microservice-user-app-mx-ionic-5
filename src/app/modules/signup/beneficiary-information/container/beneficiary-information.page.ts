import { Component, OnInit } from '@angular/core';
import { BeneficiaryFacade } from '../facade/facade';

@Component({
  selector: 'mbc-beneficiary-information',
  templateUrl: './beneficiary-information.page.html',
  styleUrls: ['./beneficiary-information.page.scss']
})
export class BeneficiaryInformationPage implements OnInit {
  constructor(public facade: BeneficiaryFacade) {}

  ngOnInit() {}
}
