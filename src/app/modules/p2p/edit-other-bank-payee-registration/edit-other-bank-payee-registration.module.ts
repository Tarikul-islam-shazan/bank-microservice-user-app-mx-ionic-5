import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditOtherBankPayeeRegistrationPageRoutingModule } from './edit-other-bank-payee-registration-routing.module';

import { EditOtherBankPayeeRegistrationPage } from './container/edit-other-bank-payee-registration.page';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';
import { SuccessModalPageModule } from '@app/shared/components/success-modal/success-modal.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    EditOtherBankPayeeRegistrationPageRoutingModule,
    SuccessModalPageModule
  ],
  declarations: [EditOtherBankPayeeRegistrationPage],
  providers: [...FACADE_SERVICE]
})
export class EditOtherBankPayeeRegistrationPageModule {}
