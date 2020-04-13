import { NgModule } from '@angular/core';

import { GeneralInformationPageRoutingModule } from './general-information-routing.module';

import { GeneralInformationPage } from './container/general-information.page';

import { SignupComponentsModule } from '../components';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [SharedModule, SignupComponentsModule, GeneralInformationPageRoutingModule],
  declarations: [GeneralInformationPage]
})
export class GeneralInformationPageModule {}
