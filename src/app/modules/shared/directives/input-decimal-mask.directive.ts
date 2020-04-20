import { Directive, HostListener, Input } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { SettingsService } from '@app/core/services/settings.service';
import { REG_EX_PATTERNS } from '@app/core/models/patterns';
interface IInputMaskDecimal {
  symbol?: string;
  noOfDecimalPoint?: number;
  maxDigit?: number;
  decModel?: string;
}
@Directive({
  selector: '[appInputDecimalMask]'
})
export class InputDecimalMaskDirective {
  @Input() set decModel(val: string) {
    if (val) {
      this.inputRef.value = val;
      this.setDecimalMask({ decModel: val });
      this.initTemplateValue();
    }
  }
  decimalMask: IInputMaskDecimal;
  constructor(private inputRef: IonInput, private settingsService: SettingsService) {
    this.setDecimalMask({
      symbol: this.settingsService.getCurrencySymbol,
      noOfDecimalPoint: 2,
      maxDigit: 15
    });
  }

  setDecimalMask(inputMaskDecimal: IInputMaskDecimal) {
    this.decimalMask = { ...this.decimalMask, ...inputMaskDecimal };
  }

  /**
   * Its just format input value which is come from template @input
   *
   * @private
   * @memberof InputDecimalMaskDirective
   */
  private initTemplateValue() {
    let inputValue = this.inputRef.value.toString();
    inputValue = inputValue.replace(REG_EX_PATTERNS.ALLOW_ONLY_NUMBERS_AND_DOT, '');
    if (inputValue.indexOf('.') < 0) {
      inputValue = parseFloat(inputValue)
        .toFixed(this.decimalMask.noOfDecimalPoint)
        .toString();
    } else {
      const [wholePart, decimalPart] = inputValue.split('.');
      if (decimalPart.length > this.decimalMask.noOfDecimalPoint) {
        inputValue = inputValue.slice(0, inputValue.indexOf('.') + 1 + this.decimalMask.noOfDecimalPoint);
      } else {
        inputValue = parseFloat(inputValue)
          .toFixed(this.decimalMask.noOfDecimalPoint)
          .toString();
      }
    }
    this.inputRef.value = this.setDecimal(this.onlyNumbersString(inputValue));
  }
  /**
   * Formatting inputString to number string
   *
   * @param {string} inputString
   * @returns {string}
   * @memberof InputDecimalMaskDirective
   */
  onlyNumbersString(inputString: string): string {
    return inputString.replace(REG_EX_PATTERNS.ALLOW_ONLY_NUMBERS, '');
  }
  @HostListener('ionFocus', ['$event']) onfocus() {
    if (!this.inputRef.value) {
      this.inputRef.value = '0';
    }
  }
  @HostListener('ionBlur', ['$event']) onBlur() {
    if (parseFloat(this.onlyNumbersString(this.inputRef.value.toString())) === 0) {
      this.inputRef.value = '';
    }
  }

  @HostListener('ionChange', ['$event']) onIonChange(event): void {
    const onChangeInputValue = event.target.value;
    if (onChangeInputValue) {
      if (onChangeInputValue.length <= this.decimalMask.maxDigit) {
        let onlyNumbersString = this.onlyNumbersString(onChangeInputValue);
        if (onlyNumbersString.length < this.decimalMask.noOfDecimalPoint + 2) {
          onlyNumbersString = '0' + onlyNumbersString;
        }

        if (onlyNumbersString[0] === '0' && onlyNumbersString.length > this.decimalMask.noOfDecimalPoint + 1) {
          onlyNumbersString = onlyNumbersString.substr(1);
        }
        this.inputRef.value = this.setDecimal(onlyNumbersString);
      } else {
        this.inputRef.value = this.inputRef.value.toString().slice(0, this.decimalMask.maxDigit);
      }
    }
  }

  /**
   * Return two part defference
   *
   * @param {string} onlyNumbersString
   * @returns {number}
   * @memberof InputDecimalMaskDirective
   */
  wholePartLength(onlyNumbersString: string): number {
    return onlyNumbersString.length - this.decimalMask.noOfDecimalPoint;
  }

  /**
   * This function taking number string and formate with our define pattern
   *
   * @param {string} onlyNumbersString
   * @returns {string}
   * @memberof InputDecimalMaskDirective
   */
  setDecimal(onlyNumbersString: string): string {
    let wholeNumberPart = onlyNumbersString.substr(0, this.wholePartLength(onlyNumbersString));
    const decimalPart = onlyNumbersString.substr(this.wholePartLength(onlyNumbersString));
    wholeNumberPart = wholeNumberPart
      .split('')
      .reverse()
      .join('');
    wholeNumberPart = wholeNumberPart
      .replace(REG_EX_PATTERNS.MONEY_WITH_COMMA, '$1,$2,$3')
      .split('')
      .reverse()
      .join('');
    wholeNumberPart = wholeNumberPart.replace(REG_EX_PATTERNS.NOT_ALLOW_COMMA, '');

    if (+this.decimalMask.noOfDecimalPoint > 0) {
      return this.decimalMask.symbol + wholeNumberPart + '.' + decimalPart;
    } else {
      return this.decimalMask.symbol + wholeNumberPart;
    }
  }
}
