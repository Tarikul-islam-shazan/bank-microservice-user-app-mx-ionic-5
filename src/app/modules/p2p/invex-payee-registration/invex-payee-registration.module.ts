import { NgModule } from '@angular/core';

import { InvexPayeeRegistrationPageRoutingModule } from './invex-payee-registration-routing.module';

import { InvexPayeeRegistrationPage } from './container/invex-payee-registration.page';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';
import { SuccessModalPageModule } from '@app/shared/components/success-modal/success-modal.module';

@NgModule({
  imports: [SharedModule, InvexPayeeRegistrationPageRoutingModule, SuccessModalPageModule],
  declarations: [InvexPayeeRegistrationPage],
  providers: [...FACADE_SERVICE]
})
export class InvexPayeeRegistrationPageModule {}
