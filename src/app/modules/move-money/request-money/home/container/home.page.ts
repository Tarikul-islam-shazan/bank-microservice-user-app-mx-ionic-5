/**
 * Container: Request money home page
 * Details: Request money landing page container
 * Date: February 7, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */

import { Component, OnInit } from '@angular/core';
import { HomeFacade as Facade } from '@app/move-money/request-money/home/facade/facade';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  filterKey: string;

  constructor(public facade: Facade) {}

  ngOnInit() {
    this.facade.fetchFundRequests(); // fetch the fund requests list and contact on ngInit.
  }
  /**
   * Typeaheads: Contacts serach input box typehed event.
   * @param typedString
   */
  typeahead(typedString: string) {
    this.filterKey = typedString;
  }
}
