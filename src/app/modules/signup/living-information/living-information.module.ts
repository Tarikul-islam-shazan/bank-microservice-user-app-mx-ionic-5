import { NgModule } from '@angular/core';

import { LivingInformationPageRoutingModule } from './living-information-routing.module';

import { LivingInformationPage } from './container/living-information.page';
import { SignupComponentsModule } from '../components';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [SharedModule, SignupComponentsModule, LivingInformationPageRoutingModule],
  declarations: [LivingInformationPage]
})
export class LivingInformationPageModule {}
