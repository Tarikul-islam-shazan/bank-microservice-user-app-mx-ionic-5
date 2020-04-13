import { NgModule } from '@angular/core';
import { AccountSelectionPageRoutingModule } from './account-selection-routing.module';

import { AccountSelectionPage } from './container/account-selection.page';
import { SignupComponentsModule } from '../components';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [SharedModule, SignupComponentsModule, AccountSelectionPageRoutingModule],
  declarations: [AccountSelectionPage]
})
export class AccountSelectionPageModule {}
