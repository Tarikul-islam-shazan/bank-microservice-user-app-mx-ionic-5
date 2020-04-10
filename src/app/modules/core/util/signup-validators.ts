import { AbstractControl, FormGroup, Validator, ValidatorFn, Validators } from '@angular/forms';
import { noop } from 'rxjs';
import { REG_EX_PATTERNS } from '@app/core/models/patterns';

export class SignupValidators {
  /**
   * @summary matches a character in the range "A" to "Z".
   * @summary case sensitive.
   *
   * @static
   * @param {AbstractControl} control
   * @returns {{ [key: string]: boolean }}
   * @memberOf SignupValidators
   */
  static oneUpperCase(control: AbstractControl): { [key: string]: boolean } {
    const regex = REG_EX_PATTERNS.ONE_UPPER_CASE;
    return !regex.test(control.value) ? { oneUpperCase: true } : null;
  }

  /**
   * @summary matches a character in the range "a" to "z".
   * @summary case sensitive.
   *
   * @static
   * @param {AbstractControl} control
   * @returns {{ [key: string]: boolean }}
   * @memberOf SignupValidators
   */
  static oneLowerCase(control: AbstractControl): { [key: string]: boolean } {
    const regex = REG_EX_PATTERNS.ONE_LOWER_CASE;
    return !regex.test(control.value) ? { oneLowerCase: true } : null;
  }

  /**
   * @summary matches a character in the range 0 to 9.
   * @summary case sensitive.
   *
   * @static
   * @param {AbstractControl} control
   * @returns {{ [key: string]: boolean }}
   * @memberOf SignupValidators
   */
  static oneNumber(control: AbstractControl): { [key: string]: boolean } {
    const regex = REG_EX_PATTERNS.ONE_NUMBER;
    return !regex.test(control.value) ? { oneNumber: true } : null;
  }

  /**
   * @summary matches a character with:
   * @summary One range from "A" to "Z"
   * @sumamry One range from "a" to "z"
   * @sumamry One in the list "_", ".", "-"
   *
   * @static
   * @param {AbstractControl} control
   * @returns {{ [key: string]: boolean }}
   * @memberOf SignupValidators
   */
  static oneSpecialChar(control: AbstractControl): { [key: string]: boolean } {
    const regex = REG_EX_PATTERNS.ONE_SPECIAL_CHARACTER;
    return !regex.test(control.value) ? { oneSpecialChar: true } : null;
  }
  /**
   * @summary matches any white space
   *
   * @static
   * @param {AbstractControl} control
   * @returns {{ [key: string]: boolean }}
   *
   * @memberOf SignupValidators
   */

  static notAllowedCharacter(control: AbstractControl): { [key: string]: boolean } {
    const regex = REG_EX_PATTERNS.ALLOWED_CHARACTER;
    return regex.test(control.value) ? { notAllowedCharacter: true } : null;
  }
  /**
   * @summary matches if consecutive text
   *
   * @static
   * @param {AbstractControl} control
   * @returns {{ [key: string]: boolean }}
   *
   * @memberOf SignupValidators
   */
  static notAllowRepeatingCharacter(control: AbstractControl): { [key: string]: boolean } {
    const regex = REG_EX_PATTERNS.NOT_ALLOWED_REPEATING_CHARACTER;
    return regex.test(control.value) ? { notAllowRepeatingCharacter: true } : null;
  }

  /**
   * @summary matches a character with:
   * @summary One range from "A" to "Z"
   * @sumamry One range from "a" to "z"
   * @sumamry One in the list 0 to 9.
   *
   * @static
   * @param {AbstractControl} control
   * @returns {{ [key: string]: boolean }}
   *
   * @memberOf SignupValidators
   */
  static allowedUsernameCharacters(control: AbstractControl): { [key: string]: boolean } {
    const regex = REG_EX_PATTERNS.USERNAME;
    return !regex.test(control.value) ? { allowedUsernameCharacters: true } : null;
  }

  /**
   * @summary matches if the regex is satisfied.
   *
   * @static
   * @param {AbstractControl} control
   * @returns {{ [key: string]: boolean }}
   *
   * @memberOf SignupValidators
   */
  static allowedPasswordSpecialChars(control: AbstractControl): { [key: string]: boolean } {
    const regex = /[!@#$%^&*-]/;
    const allowedChars = REG_EX_PATTERNS.PASSWORD;
    return !regex.test(control.value)
      ? { allowedPasswordSpecialChars: true }
      : !control.value.match(allowedChars)
      ? { allowedPasswordSpecialChars: true }
      : null;
  }
  /**
   * @summary This function validates the zipCode that has been received from the FromControl
   * @summary not allowed formats '00000' or '00000-0000'
   *
   * @static
   * @param {AbstractControl} control
   * @returns {{ [key: string]: boolean }}
   * @memberof CustomValidators
   */

  /**
   * Issue:  GMA-4676
   * Details:  Signup > Location screen: Need validation for Zip code.
   * Date: March 10, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */

  static zipCodeValidation(control: AbstractControl): { [key: string]: boolean } {
    const { value: zipCodeValue } = control;
    const regex = REG_EX_PATTERNS.US_ZIP_CODE_WITH_FIVE_DIGITS;
    const regexTen = REG_EX_PATTERNS.US_ZIP_CODE_WITH_TEN_DIGITS;
    return zipCodeValue.length > 5
      ? !regexTen.test(zipCodeValue)
        ? { zipCodeValidation: true }
        : null
      : !regex.test(zipCodeValue)
      ? { zipCodeValidation: true }
      : null;
  }

  /**
   * @summary conditionally check if the specified control
   * @summary should be required or not.
   *
   * @static
   * @param {string} controlToCheck
   * @param {string} conditionalControl
   * @param {ValidatorFn} validators
   * @returns {ValidatorFn}
   * @memberOf SignupValidators
   */
  static conditionallyCheckIfRequired(
    controlToCheck: string,
    conditionalControl: string,
    validators: ValidatorFn
  ): ValidatorFn {
    return (formGroup: FormGroup) => {
      if (!formGroup.value[controlToCheck]) {
        formGroup.controls[conditionalControl].setValidators(validators);

        return Validators.required(formGroup.get(conditionalControl))
          ? {
              isRequired: true
            }
          : null;
      }
      if (formGroup.controls[conditionalControl].value) {
        formGroup.controls[conditionalControl].reset();
      }
      formGroup.controls[conditionalControl].clearValidators();
      return null;
    };
  }
}
