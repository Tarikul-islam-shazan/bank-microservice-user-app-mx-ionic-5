/**
 * Directive: Input mask directive
 * Details: This directive will taking input field with specific InputFormatType
 * Date: March 20, 2020
 * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
 */
import { Directive, HostListener, Input } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { REG_EX_PATTERNS } from '@app/core/models/patterns';
import { SettingsService } from '@app/core/services/settings.service';
export interface IinputOption {
  type: InputFormatType;
  maxLength?: number;
}

export enum InputFormatType {
  WORDS = 'WORDS',
  ONLY_ONE_WORD = 'ONLY_ONE_WORD',
  PHONE_MASK = 'PHONE_MASK',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
  ONLY_NUMBER = 'ONLY_NUMBER'
}
@Directive({
  selector: '[appMaskInput]'
})
export class MaskInputDirective {
  @Input('appMaskInput') inputItem: IinputOption;
  dialCode: string;
  constructor(private inputField: IonInput, private settingService: SettingsService) {
    this.dialCode = this.settingService.getCurrentLocale().dialCode.toString();
  }
  @HostListener('ionChange', ['$event']) onIonChange(event: KeyboardEvent) {
    switch (this.inputItem.type) {
      case InputFormatType.ONLY_ONE_WORD:
        this.formatOnlyOneWordInput();
        break;
      case InputFormatType.WORDS:
        this.formatWordsInput();
        break;
      case InputFormatType.PHONE_MASK:
        this.inputField.value = this.formatPhoneNumMask(this.inputField.value);
        break;
      case InputFormatType.EMAIL_VERIFICATION:
        this.inputField.value = this.emailVerificationMask(this.inputField.value);
        break;
      case InputFormatType.ONLY_NUMBER:
        this.inputField.value = this.onlyNumber(this.inputField.value, this.inputItem.maxLength);
        break;
    }
  }

  @HostListener('ionFocus', ['$event']) onIonFocus(event: KeyboardEvent) {
    switch (this.inputItem.type) {
      case InputFormatType.PHONE_MASK:
        if (this.inputField.value.toString().length === 0) {
          this.inputField.value = this.dialCode;
        }
        break;
    }
  }

  /**
   * Deatials: Take only one Word
   *
   * @memberof InputDirective
   */
  formatOnlyOneWordInput(): void {
    this.inputField.value = this.inputField.value.toString().replace(REG_EX_PATTERNS.WHITE_SPACE, '');
  }

  /**
   * Details: format words input by given only one space to each word
   *
   * @memberof InputDirective
   */
  formatWordsInput(): void {
    let wordText = this.inputField.value;
    wordText = this.sliceMultipleSpace(wordText.toString());
    if (wordText) {
      this.inputField.value = wordText.replace(REG_EX_PATTERNS.ALPHABETICAL, '');
    }
  }

  /**
   * Details: sliceMultipleSpace multiple space form a input field
   *
   * @param {string} word
   * @returns {string}
   * @memberof InputDirective
   */
  sliceMultipleSpace(word: string): string {
    return word.replace(REG_EX_PATTERNS.ONE_SPACE, ' ');
  }

  /**
   * Issue:  GMA-4646
   * Details:  General Information: Input fields not visible because of the keypad.
   * Created the phone number directive
   * Date: April 03, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */

  /**
   * takes the input stream and start formatting the phone number and sets a limit to the phone
   * number to a certain length. However, this formatting will only work for USA
   *
   * @param {*} phoneStr
   * @returns
   * @memberof MaskInputDirective
   */
  formatPhoneNumMask(phoneStr): string {
    let phone = phoneStr;
    const len = phone.length;
    const phoneLength = 16;
    if (len > phoneLength) {
      phone = phone.substr(0, phoneLength);
    }
    phone = this.fixPhoneMask(phone);
    return phone;
  }

  /**
   * actual function for formatting the phone number from the input stream
   * However, this masking is only for US only. This will not work for
   * other countries
   * Sanitul bhai also helped for optimizing the function
   * @param {*} phoneStr
   * @returns
   * @memberof MaskInputDirective
   */
  fixPhoneMask(phoneStr): string {
    const len = phoneStr.length;
    const lengthTwelve = 12;
    const lengthSeven = 7;
    const lengthZero = 0;
    phoneStr = phoneStr.replace(REG_EX_PATTERNS.PHONE_MASK, '');
    if (len > lengthTwelve) {
      phoneStr = [phoneStr.slice(0, 1), ' ', phoneStr.slice(1)].join('');
      phoneStr = [phoneStr.slice(0, 2), '(', phoneStr.slice(2)].join('');
      phoneStr = [phoneStr.slice(0, 6), ')', phoneStr.slice(6)].join('');
      phoneStr = [phoneStr.slice(0, 7), ' ', phoneStr.slice(7)].join('');
      phoneStr = [phoneStr.slice(0, 11), '-', phoneStr.slice(11)].join('');
    } else if (len > lengthSeven) {
      phoneStr = [phoneStr.slice(0, 1), ' ', phoneStr.slice(1)].join('');
      phoneStr = [phoneStr.slice(0, 2), '(', phoneStr.slice(2)].join('');
      phoneStr = [phoneStr.slice(0, 6), ')', phoneStr.slice(6)].join('');
      phoneStr = [phoneStr.slice(0, 7), ' ', phoneStr.slice(7)].join('');
    } else if (len === lengthZero) {
      phoneStr = [this.dialCode].join('');
    }
    return phoneStr;
  }

  emailVerificationMask(word): string {
    word = word.replace(REG_EX_PATTERNS.ONLY_NUMBER, '');
    return word;
  }

  onlyNumber(word, inputMaxLength = null): string {
    word = word.replace(REG_EX_PATTERNS.ONLY_NUMBER, '');
    if (inputMaxLength !== null) {
      const value = word.toString().substr(0, inputMaxLength); // discard input string upto limit
      if (value.length <= inputMaxLength) {
        word = value;
      } else {
        word = value.substr(0, inputMaxLength);
      }
    }
    return word;
  }
}
