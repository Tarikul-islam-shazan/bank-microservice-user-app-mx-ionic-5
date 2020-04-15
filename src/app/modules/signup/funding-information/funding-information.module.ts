import { NgModule } from '@angular/core';
import { FundingInformationPageRoutingModule } from './funding-information-routing.module';
import { FundingInformationPage } from './container/funding-information.page';
import { SignupComponentsModule } from '../components';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [SharedModule, SignupComponentsModule, FundingInformationPageRoutingModule],
  declarations: [FundingInformationPage]
})
export class FundingInformationPageModule {}
