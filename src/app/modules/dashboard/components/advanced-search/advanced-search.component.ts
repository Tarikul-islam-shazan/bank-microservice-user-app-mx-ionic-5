/**
 * @component AdvancedSearchComponent
 * @description This is a custom component for advanced transaction search feature
 * @author: M G Muntaqeem <muntaqeem@bs-23.net>
 * Date: March 06, 2020
 */
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ITransactionQueries, AccountType } from '@app/core';
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
    this.checkSearchFormValidation();
  }

  /**
   * @description Initiate the form with the desired fields
   * @memberof AdvancedSearchComponent
   */
  initiateForm() {
    this.transactionForm = this.formBuilder.group({
      amountFrom: [null],
      amountTo: [null],
      dateFrom: [null],
      dateTo: [null]
    });
    this.transactionQueries = {};
  }

  /**
   * @summary A function to determine isFromVaild, whether amount range is given or Date range is given.
   * @memberof AdvancedSearchComponent
   */
  checkSearchFormValidation(): boolean {
    const { amountFrom, amountTo, dateFrom, dateTo } = this.getSearchFormValues();
    let isValid = false;
    if (dateFrom) {
      if (!dateTo) {
        return false;
      }
      isValid = true;
    } else if (dateTo) {
      return false;
    }
    if (amountFrom) {
      if (!amountTo) {
        return false;
      }
      isValid = true;
    } else if (amountTo) {
      return false;
    }
    return isValid;
  }

  getSearchFormValues(): ITransactionQueries {
    let { amountFrom, amountTo } = this.transactionForm.value;
    amountFrom = amountFrom ? Number(amountFrom.replace(/[$,]/g, '')) : 0;
    amountTo = amountTo ? Number(amountTo.replace(/[$,]/g, '')) : 0;
    const { dateFrom, dateTo } = this.transactionForm.value;
    return { amountFrom, amountTo, dateFrom, dateTo };
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
    const { amountFrom, amountTo, dateFrom, dateTo } = this.getSearchFormValues();
    if (amountFrom) {
      this.transactionQueries.amountFrom = amountFrom;
    }
    if (amountTo) {
      this.transactionQueries.amountTo = amountTo;
    }
    if (dateFrom) {
      this.transactionQueries.dateFrom = moment(dateFrom).format('MM/DD/YYYY 00:00:00');
    }
    if (dateTo) {
      this.transactionQueries.dateTo = moment(dateTo).format('MM/DD/YYYY 00:00:00');
    }

    this.search.emit(this.transactionQueries);
  }
}
