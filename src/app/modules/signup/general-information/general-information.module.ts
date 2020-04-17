import { NgModule } from '@angular/core';

import { GeneralInformationPageRoutingModule } from './general-information-routing.module';

import { GeneralInformationPage } from './container/general-information.page';

import { SignupComponentsModule } from '../components';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';

@NgModule({
  imports: [SharedModule, SignupComponentsModule, GeneralInformationPageRoutingModule],
  providers: [FACADE_SERVICE],
  declarations: [GeneralInformationPage]
})
export class GeneralInformationPageModule {}
