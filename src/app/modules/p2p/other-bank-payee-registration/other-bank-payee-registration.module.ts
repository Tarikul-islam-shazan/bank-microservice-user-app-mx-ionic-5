import { NgModule } from '@angular/core';
import { OtherBankPayeeRegistrationPageRoutingModule } from './other-bank-payee-registration-routing.module';

import { OtherBankPayeeRegistrationPage } from './container/other-bank-payee-registration.page';
import { SharedModule } from '@app/shared';
import { SuccessModalPageModule } from '@app/shared/components/success-modal/success-modal.module';
import { FACADE_SERVICE } from './facade';

@NgModule({
  imports: [SharedModule, OtherBankPayeeRegistrationPageRoutingModule, SuccessModalPageModule],
  declarations: [OtherBankPayeeRegistrationPage],
  providers: [...FACADE_SERVICE]
})
export class OtherBankPayeeRegistrationPageModule {}
