/**
 * Directive: FormateZipCodeDirective
 * Details: Formate and validate zipcode on ion-input.
 * Date: February 20, 2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 *
 */
import { CommonValidators } from '@app/core/util';
import { Directive, HostListener, OnInit } from '@angular/core';
import { NgControl, Validators } from '@angular/forms';
import { REG_EX_PATTERNS } from '@app/core/models/patterns';

@Directive({
  selector: '[appFormateZipCode]'
})
export class FormateZipCodeDirective implements OnInit {
  private _valueLengthAfterDashSymbolForUsZipCode = 10;
  private _valueLengthBeforeDashSymbolForUsZipCode = 5;

  constructor(private zipCodeControl: NgControl) {}

  /**
   * Setting zip code validations
   * set cureent value to _value.
   */
  ngOnInit(): void {
    this.setUsZipCodeValidators();
    this.formateZipCodeAsUsPatterns(this.zipCodeControl.control.value);
  }

  /**
   * @summary Setting zip code validation as US PATTERNS
   *
   * @private
   * @returns {void}
   * @memberOf FormateZipCodeDirective
   */

  // added new validation for zipcode
  private setUsZipCodeValidators(): void {
    this.zipCodeControl.control.setValidators([
      Validators.required,
      Validators.maxLength(10),
      CommonValidators.zipCodeValidation
    ]);
  }

  /**
   * @summary Checking and updating  the value on every character change.
   *
   * @param {KeyboardEvent} _e
   * @returns {void}
   * @memberOf FormateZipCodeDirective
   */
  @HostListener('ionChange', ['$event'])
  onIonChange(_e: KeyboardEvent): void {
    this.formateZipCodeAsUsPatterns(this.zipCodeControl.control.value);
  }

  /**
   * @summary updates associated inputs value
   *
   * @private
   * @param {string} value
   * @returns {void}
   * @memberOf FormateZipCodeDirective
   */
  private updateValue(value: string): void {
    this.zipCodeControl.control.patchValue(value);
  }

  /**
   * @summary let  _valueLengthBeforeDashSymbolForUsZipCode=5;
   * @summary Adding a '-' at position 6  (_valueLengthBeforeDashSymbolForUsZipCode+1) ->
   * @summary when zipCode length is 6 (_valueLengthBeforeDashSymbol+1).
   * @summary if '-'  is not exist at position 6 (_valueLengthBeforeDashSymbolForUsZipCode+1).
   * @summary Exmaple of a valid zip code: 32423-4231
   *
   * @private
   * @param {string} value
   * @returns {void}
   * @memberOf FormateZipCodeDirective
   */
  /**
   * Issue: GMA-4756
   * Details:  Special characters are not allowed in Zip code field.
   * Date: March 25, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */

  private formateZipCodeAsUsPatterns(value: string): void {
    if (!value) {
      return;
    }
    value = value.replace(REG_EX_PATTERNS.WHITE_SPACE, '');
    value = value.replace(REG_EX_PATTERNS.ONLY_NUMBER, '');
    if (value.length > this._valueLengthBeforeDashSymbolForUsZipCode) {
      if (value[this._valueLengthBeforeDashSymbolForUsZipCode] !== '-') {
        value = value.replace('-', '');
        value =
          value.slice(0, this._valueLengthBeforeDashSymbolForUsZipCode) +
          '-' +
          value.slice(this._valueLengthBeforeDashSymbolForUsZipCode, 10);
      }
    } else {
      value = value.replace('-', '');
    }
    if (value.length > this._valueLengthAfterDashSymbolForUsZipCode) {
      value = value.slice(0, this._valueLengthAfterDashSymbolForUsZipCode);
    }
    this.updateValue(value);
  }
}
