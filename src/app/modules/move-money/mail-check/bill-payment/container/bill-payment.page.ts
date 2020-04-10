import moment from 'moment-timezone';
import { BillPaymentFacade } from '../facade';
import { Component, OnInit } from '@angular/core';
import { CommonValidators, IBillPayee, IBillPayment, PaymentFrequency } from '@app/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bill-payment',
  templateUrl: './bill-payment.page.html',
  styleUrls: ['./bill-payment.page.scss']
})
export class BillPaymentPage implements OnInit {
  billPayee: IBillPayee;
  billPayment: IBillPayment;
  billPaymentForm: FormGroup;
  paymentFrequency = PaymentFrequency;

  minDate = moment().format();
  maxDate = moment()
    .add(10, 'y')
    .format('YYYY-MM-DD');

  constructor(private facade: BillPaymentFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.billPayee = this.facade.getBillPayee();
    this.initBillPayment();
    this.initBillPaymentForm();
    this.patchFormValueIfExists();
  }

  /**
   * @summary initializes form.
   *
   * @private
   * @returns {void}
   * @memberOf BillPaymentPage
   */
  private initBillPaymentForm(): void {
    this.billPaymentForm = this.formBuilder.group({
      amount: [
        '',
        [Validators.required, CommonValidators.minimumTransferAmount(1), CommonValidators.maximumTransferAmount(1000)]
      ],
      executionDate: [this.minDate, Validators.required],
      frequency: [false, Validators.required]
    });
  }

  /**
   * @summary initializes bill payment
   *
   * @private
   * @returns {void}
   * @memberOf BillPaymentPage
   */
  private initBillPayment(): void {
    this.billPayment = {
      currency: 'USD',
      executionDate: this.convertTimezoneToLocal(this.billPayee.executionDate),
      payeeId: this.billPayee.payeeId.toString()
    };
  }

  /**
   * @summary sets amount value
   *
   * @private
   * @returns {void}
   * @memberOf BillPaymentPage
   */
  private setAmountValueFromBillPayee(): void {
    this.billPaymentForm.controls.frequency.disable();
    const amount = this.billPayee.amount;
    this.billPaymentForm.controls.amount.patchValue(amount);

    setTimeout(() => {
      this.billPaymentForm.setErrors({ amountNotUpdated: true });
    }, 200);
  }

  /**
   * @sumamry converts date to user's timezone.
   *
   * @private
   * @param {string} dateTime
   * @returns {string}
   * @memberOf BillPaymentPage
   */
  private convertTimezoneToLocal(dateTime: string): string {
    return moment(dateTime).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  }

  /**
   * @summary converts local date to bank's timezone.
   *
   * @private
   * @param {string} dateToConvert
   * @returns {string}
   * @memberOf BillPaymentPage
   */
  private convertTimezoneToBank(dateToConvert: string): string {
    const formattedDate = moment(dateToConvert).format('YYYY-MM-DD'),
      formattedRequestDate = moment(this.billPayee.firstAvailableProcessDate).format('YYYY-MM-DD');
    return moment(formattedDate).isSame(formattedRequestDate, 'day')
      ? this.convertTimezoneToLocal(this.billPayee.firstAvailableProcessDate)
      : moment(dateToConvert)
          .format('YYYY-MM-DD')
          .concat(moment().format('THH:mm:ss.SSSZ'));
  }

  /**
   * @summary sets minimum date to first available process date.
   * @summary gets bank time zone from firstAvailableProcessDate.
   *
   * @private
   * @returns {void}
   * @memberOf BillPaymentPage
   */
  private setFirstAvailableProcessDate(): void {
    this.minDate = this.convertTimezoneToLocal(this.billPayee.firstAvailableProcessDate);
  }

  /**
   * @summary sets date value
   *
   * @private
   * @returns {void}
   * @memberOf BillPaymentPage
   */
  private setPaymentDateFromBillPayee(dateTime: string): void {
    this.billPaymentForm.controls.executionDate.patchValue(this.convertTimezoneToLocal(dateTime));
  }

  /**
   * @summary sets frequency value
   *
   * @private
   * @returns {void}
   * @memberOf BillPaymentPage
   */
  private setPaymentFrequencyFromBillPayee(): void {
    this.billPaymentForm.controls.frequency.patchValue(true);
    this.billPaymentForm.controls.executionDate.disable();
  }

  /**
   * @summary disables all fields of billPaymentForm form
   *
   * @private
   * @returns {void}
   * @memberOf BillPaymentPage
   */
  private disablePaymentFormFields(): void {
    this.billPaymentForm.disable();
  }

  /**
   * @summary patches form values if data exists already
   *
   * @private
   * @returns {void}
   * @memberOf BillPaymentPage
   */
  private patchFormValueIfExists(): void {
    if (this.billPayee) {
      const shouldDisablePaymentFormFields =
          this.billPayee.frequency === PaymentFrequency.Once &&
          moment(this.billPayee.executionDate).isBefore(moment().format(), 'days'),
        firstAvailableProcessDate = this.billPayee.firstAvailableProcessDate && !this.billPayee.executionDate,
        isPaymentFrequencyMonthly = this.billPayee.frequency === PaymentFrequency.Monthly;

      if (this.billPayee.amount) {
        this.setAmountValueFromBillPayee();
      }

      if (this.billPayee.firstAvailableProcessDate) {
        this.setFirstAvailableProcessDate();
      }

      if (firstAvailableProcessDate) {
        this.setPaymentDateFromBillPayee(this.billPayee.firstAvailableProcessDate);
      }

      if (this.billPayee.executionDate) {
        this.setPaymentDateFromBillPayee(this.billPayee.executionDate);
      }

      if (shouldDisablePaymentFormFields) {
        this.disablePaymentFormFields();
      }

      if (isPaymentFrequencyMonthly) {
        this.setPaymentFrequencyFromBillPayee();
      }
    }
  }

  /**
   * @summary convert payment amount from string to number by replacing
   * ',', '$'
   *
   * @param {string} amount
   * @returns {number}
   * @memberOf BillPaymentPage
   */
  convertPaymentAmountToNumber(amount: string): number {
    return Number(amount.replace(/[$,]/g, ''));
  }

  /**
   * @summary sends otp with paymentInfo
   *
   * @returns {void}
   * @memberOf BillPaymentPage
   */
  add(): void {
    const paymentFormData = this.billPaymentForm.value,
      paymentInfo = Object.assign(this.billPayment, paymentFormData);

    paymentInfo.amount = this.convertPaymentAmountToNumber(paymentInfo.amount);
    paymentInfo.executionDate = this.convertTimezoneToBank(paymentInfo.executionDate);
    paymentInfo.frequency = paymentInfo.frequency ? PaymentFrequency.Monthly : PaymentFrequency.Once;

    this.facade.handleOTPSend(paymentInfo);
  }

  /**
   * @summary updates payment
   *
   * @returns {void}
   * @memberOf BillPaymentPage
   */
  update(): void {
    this.billPayment.paymentId = this.billPayee.paymentId;
    const paymentFormData = this.billPaymentForm.value;

    Object.keys(paymentFormData).forEach(key => paymentFormData[key] === undefined && delete paymentFormData[key]);

    const paymentInfo = Object.assign(this.billPayment, paymentFormData);

    paymentInfo.amount = this.convertPaymentAmountToNumber(paymentFormData.amount);
    paymentInfo.executionDate = this.convertTimezoneToBank(paymentInfo.executionDate);

    this.facade.update(paymentInfo);
  }

  /**
   * @summary handles payment delete.
   *
   * @returns {void}
   * @memberOf BillPaymentPage
   */
  delete(): void {
    this.facade.delete();
  }

  /**
   * @summary navigates to the specified route.
   *
   * @param {string} pageToNavigate
   * @returns {void}
   * @memberOf BillPaymentPage
   */
  navigateToPage(pageToNavigate: string): void {
    this.facade.navigateToPage(pageToNavigate);
  }
}
