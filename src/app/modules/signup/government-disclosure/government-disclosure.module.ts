import { NgModule } from '@angular/core';
import { GovernmentDisclosurePageRoutingModule } from './government-disclosure-routing.module';

import { GovernmentDisclosurePage } from './container/government-disclosure.page';
import { SignupComponentsModule } from '../components';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [SharedModule, SignupComponentsModule, GovernmentDisclosurePageRoutingModule],
  declarations: [GovernmentDisclosurePage]
})
export class GovernmentDisclosurePageModule {}
