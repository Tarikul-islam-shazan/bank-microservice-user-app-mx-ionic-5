import { Directive, HostListener, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IonInput } from '@ionic/angular';
@Directive({
  selector: '[appInputDecimalMask]'
})
export class InputDecimalMaskDirective implements OnInit {
  inputRef: IonInput;
  value: string;
  noOfDecimal = 2;
  maxDigit = 15;
  flag = false;
  hideCurrency = false;
  currency = '$';

  @Input() set decModel(val: string) {
    this.value = val;
    this.flag = true;
    this.ngOnInit();
  }
  @Input() set 'no-of-decimal'(val) {
    this.noOfDecimal = val;
  }

  @Input() set 'hide-currency'(val) {
    this.currency = '';
    this.hideCurrency = true;
    this.ngOnInit();
  }
  @Output() decModelChange = new EventEmitter();

  constructor(inputRef: IonInput) {
    this.inputRef = inputRef;
  }
  ngOnInit() {
    setTimeout(() => {
      if (this.flag) {
        this.inputRef.value = this.value;
      }
      if (this.inputRef.value) {
        let val = this.inputRef.value.toString();
        val = val.replace(/[^0-9.]/g, '');
        if (val.indexOf('.') < 0) {
          val = parseFloat(val)
            .toFixed(this.noOfDecimal)
            .toString();
        } else {
          const a = val.split('.');
          if (a[1].length > this.noOfDecimal) {
            val = val.slice(0, val.indexOf('.') + 1 + this.noOfDecimal);
          } else {
            val = parseFloat(val)
              .toFixed(this.noOfDecimal)
              .toString();
          }
        }
        val = val.replace(/[^0-9]/g, '');
        this.inputRef.value = this.setDecimal(val.toString(), this.noOfDecimal);
      }
    });
  }

  @HostListener('ionFocus', ['$event']) onfocus(e) {
    if (!this.inputRef.value) {
      this.inputRef.value = '0';
      this.decModelChange.emit('0');
    }
  }
  @HostListener('ionBlur', ['$event']) onBlur(e) {
    const cleann = parseFloat(this.inputRef.value.toString().replace(/[^0-9]/g, ''));
    if (cleann === 0) {
      this.inputRef.value = '';
      this.decModelChange.emit('');
    }

    if (this.inputRef.value.toString().length > this.maxDigit) {
      this.decModelChange.emit(this.inputRef.value.toString().slice(0, this.maxDigit));
    }
  }

  @HostListener('keyup', ['$event']) onChange(e) {
    if (e.target.value) {
      if (e.target.value.length <= this.maxDigit) {
        let clean: any = e.target.value.replace(/[^0-9]/g, '');

        if (clean.length < this.noOfDecimal + 2) {
          clean = '0' + clean;
        }

        if (clean[0] === '0' && clean.length > this.noOfDecimal + 1) {
          clean = clean.substr(1);
        }

        this.inputRef.value = this.setDecimal(clean, this.noOfDecimal);
        const a = this.inputRef.value;
        this.decModelChange.emit(a.replace(/[^0-9.]/g, ''));
      } else {
        this.inputRef.value = this.inputRef.value.toString().slice(0, this.maxDigit);
      }
    }
  }

  @HostListener('keypress', ['$event']) onInputChange(e) {
    if (e.target.value.length >= this.maxDigit) {
      e.preventDefault();
    }
  }

  @HostListener('keydown', ['$event']) onInputChangekeydown(e) {
    if (e.target.value.length > this.maxDigit) {
      e.preventDefault();
    }
  }

  setDecimal(value, decimalPlace) {
    let int = value.substr(0, value.length - decimalPlace);

    /*----------  Handling Comma  ----------*/
    int = int
      .split('')
      .reverse()
      .join('');
    const formatted = int.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,3})*/, '$1,$2,$3,$4,$5,$6');
    int = formatted
      .split('')
      .reverse()
      .join('');
    int = int.replace(/(^,*)/g, '');
    /*----------  END  ----------*/

    const dec = value.substr(value.length - decimalPlace);
    if (+decimalPlace > 0) {
      return this.currency + int + '.' + dec;
    } else {
      return this.currency + int;
    }
  }
}
