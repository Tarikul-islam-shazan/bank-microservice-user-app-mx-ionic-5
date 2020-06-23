import { NgModule } from '@angular/core';

import { InvexPayeeRegistrationPageRoutingModule } from './invex-payee-registration-routing.module';

import { InvexPayeeRegistrationPage } from './container/invex-payee-registration.page';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [SharedModule, InvexPayeeRegistrationPageRoutingModule],
  declarations: [InvexPayeeRegistrationPage]
})
export class InvexPayeeRegistrationPageModule {}
