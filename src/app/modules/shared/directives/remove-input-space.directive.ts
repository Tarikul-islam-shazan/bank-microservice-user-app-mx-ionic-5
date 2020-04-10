/**
 * Directive: Remeove input space
 * Details: This directive will remove space from input field for each input value change.
 * Date: February 06, 2020
 * Developer: Dev Name tarikul@brainstation23.com
 */
import { Directive, ElementRef, HostListener } from '@angular/core';
import { IonInput } from '@ionic/angular';
@Directive({
  selector: '[appInputTrimWhitespace]'
})
export class RemoveInputSpaceDirective {
  constructor(private inputField: IonInput) {}
  @HostListener('ionChange', ['$event']) // track event for each input value change.
  onIonChange(event: KeyboardEvent) {
    this.inputField.value = this.inputField.value.toString().trim(); // trim input value for remove space
  }
}
