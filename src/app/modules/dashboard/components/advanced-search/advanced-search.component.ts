/**
 * @component AdvancedSearchComponent
 * @description This is a custom component for advanced transaction search feature
 * @author: M G Muntaqeem <muntaqeem@bs-23.net>
 * Date: March 06, 2020
 */
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ITransactionQueries } from '@app/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {
  @Output() search = new EventEmitter();
  public transactionForm: FormGroup;
  public maxDate = new Date().toISOString();

  private transactionQueries: ITransactionQueries = {};
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initiateForm();
  }

  /**
   * @description Initiate the form with the desired fields
   * @memberof AdvancedSearchComponent
   */
  initiateForm() {
    this.transactionForm = this.formBuilder.group({
      keywords: [null],
      amountFrom: [null],
      amountTo: [null],
      dateFrom: [null],
      dateTo: [null],
      includeDebits: true,
      includeCredits: true
    });
    this.transactionQueries = {};
  }

  /**
   * @description Clear all the values in the form
   * @memberof AdvancedSearchComponent
   */
  clearSearchValues() {
    this.initiateForm();
  }

  /**
   * @description Prepare the transactionQuery object with the existing form value and submit it by emmiting the event
   * @memberof AdvancedSearchComponent
   */
  submitSearch() {
    if (this.transactionForm.controls.keywords.value) {
      this.transactionQueries.keywords = this.transactionForm.controls.keywords.value;
    }
    if (
      this.transactionForm.controls.amountFrom.value &&
      this.transactionForm.controls.amountFrom.value !== '0' &&
      this.transactionForm.controls.amountFrom.value !== '$0.00'
    ) {
      this.transactionQueries.amountFrom = parseFloat(this.transactionForm.controls.amountFrom.value.split('$')[1]);
    }
    if (
      this.transactionForm.controls.amountTo.value &&
      this.transactionForm.controls.amountTo.value !== '0' &&
      this.transactionForm.controls.amountTo.value !== '$0.00'
    ) {
      this.transactionQueries.amountTo = parseFloat(this.transactionForm.controls.amountTo.value.split('$')[1]);
    }
    if (this.transactionForm.controls.dateFrom.value) {
      this.transactionQueries.dateFrom = moment(this.transactionForm.controls.dateFrom.value).format(
        'MM/DD/YYYY 00:00:00'
      );
    }
    if (this.transactionForm.controls.dateTo.value) {
      this.transactionQueries.dateTo = moment(this.transactionForm.controls.dateTo.value).format('MM/DD/YYYY 00:00:00');
    }
    this.transactionQueries.includeDebits = this.transactionForm.controls.includeDebits.value;
    this.transactionQueries.includeCredits = this.transactionForm.controls.includeCredits.value;
    this.search.emit(this.transactionQueries);
  }
}