import { NgModule } from '@angular/core';
import { BeneficiaryInformationPageRoutingModule } from './beneficiary-information-routing.module';

import { BeneficiaryInformationPage } from './container/beneficiary-information.page';
import { SignupComponentsModule } from '../components';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [SharedModule, SignupComponentsModule, BeneficiaryInformationPageRoutingModule],
  declarations: [BeneficiaryInformationPage]
})
export class BeneficiaryInformationPageModule {}
