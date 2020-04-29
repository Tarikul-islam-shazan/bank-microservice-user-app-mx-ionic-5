import { NgModule } from '@angular/core';
import { IdentityConfirmationPageRoutingModule } from './identity-confirmation-routing.module';

import { IdentityConfirmationPage } from './container/identity-confirmation.page';
import { SignupComponentsModule } from '../components';
import { SharedModule } from '@app/shared';
import { IdentityConfirmationFacade } from './facade/identity-confirmation.facade';

@NgModule({
  imports: [SharedModule, SignupComponentsModule, IdentityConfirmationPageRoutingModule],
  declarations: [IdentityConfirmationPage],
  providers: [IdentityConfirmationFacade]
})
export class IdentityConfirmationPageModule {}
