import { Component, OnInit } from '@angular/core';
import { FundingOption } from '../facade';

@Component({
  selector: 'mbc-funding-option',
  templateUrl: './funding-option.page.html',
  styleUrls: ['./funding-option.page.scss']
})
export class FundingOptionPage implements OnInit {
  constructor(public facade: FundingOption) {}

  ngOnInit() {}
}
