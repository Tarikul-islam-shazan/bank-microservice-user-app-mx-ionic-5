import { NgModule } from '@angular/core';
import { PersonalInformationPageRoutingModule } from './personal-information-routing.module';

import { PersonalInformationPage } from './container/personal-information.page';
import { SignupComponentsModule } from '../components';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [SharedModule, SignupComponentsModule, PersonalInformationPageRoutingModule],
  declarations: [PersonalInformationPage]
})
export class PersonalInformationPageModule {}
