import { NgModule } from '@angular/core';
import { OtherBankPayeeRegistrationPageRoutingModule } from './other-bank-payee-registration-routing.module';

import { OtherBankPayeeRegistrationPage } from './container/other-bank-payee-registration.page';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [SharedModule, OtherBankPayeeRegistrationPageRoutingModule],
  declarations: [OtherBankPayeeRegistrationPage]
})
export class OtherBankPayeeRegistrationPageModule {}
