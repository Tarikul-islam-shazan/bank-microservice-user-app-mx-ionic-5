import { NgModule } from '@angular/core';
import { PayeeRegistrationTypePageRoutingModule } from './payee-registration-type-routing.module';
import { PayeeRegistrationTypePage } from './container/payee-registration-type.page';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';
import { SuccessModalPageModule } from '@app/shared/components/success-modal/success-modal.module';

@NgModule({
  imports: [SharedModule, PayeeRegistrationTypePageRoutingModule, SuccessModalPageModule],
  declarations: [PayeeRegistrationTypePage],
  providers: [...FACADE_SERVICE]
})
export class PayeeRegistrationTypePageModule {}
