import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { REG_EX_PATTERNS } from '../models';

export class CommonValidators {
  /**
   * @summary checks if /^[a-z\d\s]+$/i is satisfied.
   *
   * @static
   * @param {AbstractControl} control
   * @returns {{ [key: string]: boolean }}
   *
   * @memberOf CommonValidators
   */
  static alphaNumericWithSpace(control: AbstractControl): { [key: string]: boolean } {
    const regex = REG_EX_PATTERNS.ALPHA_NUMERIC_WITH_SPACE;
    return control.value ? (!regex.test(control.value.trim()) ? { alphaNumericWithSpace: true } : null) : null;
  }

  /**
   * @sumamry checkes if minimum amount is satisfied.
   *
   * @static
   * @param {number} minimumAmount
   * @returns {ValidatorFn}
   *
   * @memberOf CommonValidators
   */
  static minimumTransferAmount(minimumAmount: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } => {
      const transferAmountValue = Number(String(control.value).replace(/[$,]/g, ''));
      return transferAmountValue < minimumAmount ? { minimumTransferAmount: true } : null;
    };
  }

  /**
   * @sumamry checkes if maximum amount is satisfied.
   *
   * @static
   * @param {number} maximumAmount
   * @returns {ValidatorFn}
   *
   * @memberOf CommonValidators
   */
  static maximumTransferAmount(maximumAmount: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } => {
      const transferAmountValue = Number(String(control.value).replace(/[$,]/g, ''));
      return transferAmountValue > maximumAmount ? { maximumTransferAmount: true } : null;
    };
  }

  /**
   * @summary matches if two fields are same.
   *
   * @static
   * @param {AbstractControl} control
   * @memberOf SignupValidators
   */
  static compareTwoFields(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  /**
   * @summary checks if zip code is not '00000' or '00000-0000'
   *
   * @static
   * @memberOf CommonValidators
   */
  static zipCodeValidation(control: AbstractControl): { [key: string]: boolean } {
    const { value: zipCodeValue } = control;
    const regex = REG_EX_PATTERNS.US_ZIP_CODE_WITH_FIVE_DIGITS;
    const regexTen = REG_EX_PATTERNS.US_ZIP_CODE_WITH_TEN_DIGITS;

    return zipCodeValue
      ? zipCodeValue.length > 5
        ? !regexTen.test(zipCodeValue)
          ? { zipCodeValidation: true }
          : null
        : !regex.test(zipCodeValue)
        ? { zipCodeValidation: true }
        : null
      : null;
  }
}
