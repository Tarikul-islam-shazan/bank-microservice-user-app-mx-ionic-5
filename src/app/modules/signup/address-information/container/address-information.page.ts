import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropdownOption } from '@app/signup/models/signup';
import { ModalController } from '@ionic/angular';
import { DropdownModalComponent, IinputOption, InputFormatType } from '@app/shared';
import { AddressInformationFacade } from '../facade';
@Component({
  selector: 'mbc-address-information',
  templateUrl: './address-information.page.html',
  styleUrls: ['./address-information.page.scss']
})
export class AddressInformationPage implements OnInit {
  addressForm: FormGroup;
  skipErrorFields: any;
  onlyNumber: IinputOption;
  postalCodeNumber: IinputOption;
  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    public facade: AddressInformationFacade
  ) {
    this.onlyNumber = {
      type: InputFormatType.ONLY_NUMBER,
      maxLength: 10
    };
    this.postalCodeNumber = {
      type: InputFormatType.ONLY_NUMBER,
      maxLength: 6
    };
  }

  ngOnInit() {
    this.initAddressForm();
  }

  initAddressForm(): void {
    this.addressForm = this.formBuilder.group({
      addressTypeField: [null, Validators.required],
      addressType: [null, Validators.required],
      propertyTypeField: [null, Validators.required],
      propertyType: [null, Validators.required],
      street: [null, [Validators.required, Validators.maxLength(40)]],
      outdoorNumber: [null, [Validators.required, Validators.maxLength(10)]],
      interiorNumber: [null, [Validators.required, Validators.maxLength(10)]],
      postCode: [null, [Validators.required, Validators.maxLength(5)]],
      state: [null, Validators.required],
      municipality: [null, Validators.required],
      city: [null, Validators.required],
      suburbField: [null, Validators.required],
      suburb: [null, Validators.required],
      dateOfResidence: [null, Validators.required]
    });
    this.skipErrorFields = Object.assign({}, this.addressForm.value);
  }

  isInputFieldSkip(formControlName: string) {
    const formFields: string[] = Object.keys(this.addressForm.controls);
    const currentFieldIndex = formFields.indexOf(formControlName);
    for (let i = currentFieldIndex - 1; i >= 0; i--) {
      const field = formFields[i];
      if (this.addressForm.controls[field].invalid) {
        this.skipErrorFields[field] = true;
      }
    }
    for (let i = currentFieldIndex + 1; i < formFields.length; i++) {
      const field = formFields[i];
      this.skipErrorFields[field] = false;
    }
  }

  async openOptionsModal(formControlName: string, formControlValue: string, options: DropdownOption[]): Promise<any> {
    this.isInputFieldSkip(formControlName);
    try {
      const modal = await this.modalCtrl.create({
        component: DropdownModalComponent,
        componentProps: { data: options }
      });
      await modal.present();
      const { data } = await modal.onWillDismiss();
      this.addressForm.controls[formControlName].patchValue(data.text);
      this[formControlName] = data ? data : null;
      this.addressForm[formControlValue] = data.value;
    } catch (error) {}
  }
}
