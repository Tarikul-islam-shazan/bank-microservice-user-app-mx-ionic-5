import { Directive, Input, HostListener } from '@angular/core';
import { Platform, IonInput } from '@ionic/angular';
/**
 * Feature: Maxlength Directive
 * Details: This directive will work for ionic android max length.
 * Date: February 10, 2020
 * Developer: Dev Name tarikul@brainstation23.com
 */

@Directive({
  selector: '[appInputMaxLength]'
})
export class InputMaxLengthDirective {
  @Input('appInputMaxLength') inputMaxLength: number;

  constructor(public platform: Platform) {}
  @HostListener('ionChange', ['$event']) onIonChangeDeductExtraCharacter(event) {
    const inputHtmlElement = event.target as IonInput;
    const value = inputHtmlElement.value.toString().substr(0, this.inputMaxLength); // discard input string upto limit
    if (value.length <= this.inputMaxLength) {
      inputHtmlElement.value = value;
    } else {
      inputHtmlElement.value = value.substr(0, this.inputMaxLength);
    }
  }
}
