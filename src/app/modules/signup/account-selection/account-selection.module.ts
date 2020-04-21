import { NgModule } from '@angular/core';
import { AccountSelectionPageRoutingModule } from './account-selection-routing.module';

import { AccountSelectionPage } from './container/account-selection.page';
import { SignupComponentsModule } from '../components';
import { SharedModule } from '@app/shared';
import { AccountSelectionFacade } from './facade/account-selection-facade';

@NgModule({
  imports: [SharedModule, SignupComponentsModule, AccountSelectionPageRoutingModule],
  declarations: [AccountSelectionPage],
  providers: [AccountSelectionFacade]
})
export class AccountSelectionPageModule {}
