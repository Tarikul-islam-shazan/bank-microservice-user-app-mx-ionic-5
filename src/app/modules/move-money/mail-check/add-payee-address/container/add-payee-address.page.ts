import { AddPayeeAddressFacade } from '../facade';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-payee-address',
  templateUrl: './add-payee-address.page.html',
  styleUrls: ['./add-payee-address.page.scss']
})
export class AddPayeeAddressPage implements OnInit {
  addPayeeAddressForm: FormGroup;

  zipCodeMaxLength = 10;

  constructor(private facade: AddPayeeAddressFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.getCountryStates();
  }

  /**
   * @summary initializes and builds addPayeeAddressForm form
   *
   * @private
   * @returns {void}
   * @memberOf AddPayeeAddressPage
   */
  private initForm(): void {
    this.addPayeeAddressForm = this.formBuilder.group({
      city: ['', Validators.required],
      phone: ['', Validators.required],
      postCode: ['', Validators.required],
      state: ['', Validators.required],
      street: ['', Validators.required]
    });
  }

  /**
   * @summary gets country states.
   *
   * @private
   * @returns {void}
   * @memberOf AddPayeeAddressPage
   */
  private getCountryStates(): void {
    this.facade.getCountryStates();
  }

  /**
   * @summary opens state modal.
   *
   * @returns {void}
   * @memberOf AddPayeeAddressPage
   */
  openStateModal(): void {
    this.facade.openStateModal(() => {
      this.addPayeeAddressForm.controls.state.patchValue(this.facade.selectedCountryState.stateName);
    });
  }

  /**
   * @summary opens otp modal on click.
   *
   * @returns {void}
   * @memberOf AddPayeeAddressPage
   */
  continue(): void {
    this.facade.continue(this.addPayeeAddressForm.value);
  }
}
