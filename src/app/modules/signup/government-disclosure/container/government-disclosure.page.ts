import { Component } from '@angular/core';
import { GovernmentDisclosureFacade } from '../facade/government-disclosure-facade';

@Component({
  selector: 'mbc-government-disclosure',
  templateUrl: './government-disclosure.page.html',
  styleUrls: ['./government-disclosure.page.scss']
})
export class GovernmentDisclosurePage {
  constructor(public facade: GovernmentDisclosureFacade) {}
}
