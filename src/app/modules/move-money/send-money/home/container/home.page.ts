/**
 * Container: Send money home page
 * Details: Initialize send money landing page form and fetch data from facade
 * Date: January 28, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */

import { Component, OnInit } from '@angular/core';
import { HomeFacade as Facade } from '@app/move-money/send-money/home/facade/facade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { REG_EX_PATTERNS } from '@app/core/models/patterns';
@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  searchForm: FormGroup;
  filterValue: string;
  constructor(public facade: Facade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.facade.fetchFundRequests(); // fetch the fund requests list and contact on ngInit.
  }
  initForm(): void {
    this.searchForm = this.formBuilder.group({
      recipientEmail: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern(REG_EX_PATTERNS.EMAIL)
        ])
      ]
    });
  }
  clearSearchInput(): void {
    this.searchForm.reset();
    this.filterValue = '';
  }
  typeahead(typedString: string): void {
    this.filterValue = typedString;
  }
}
