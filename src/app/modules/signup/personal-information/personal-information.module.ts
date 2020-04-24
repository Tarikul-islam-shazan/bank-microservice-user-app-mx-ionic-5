import { NgModule } from '@angular/core';
import { PersonalInformationPageRoutingModule } from './personal-information-routing.module';
import { PersonalInformationPage } from './container/personal-information.page';
import { SignupComponentsModule } from '../components';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';
@NgModule({
  imports: [SharedModule, SignupComponentsModule, PersonalInformationPageRoutingModule],
  providers: [FACADE_SERVICE],
  declarations: [PersonalInformationPage]
})
export class PersonalInformationPageModule {}
