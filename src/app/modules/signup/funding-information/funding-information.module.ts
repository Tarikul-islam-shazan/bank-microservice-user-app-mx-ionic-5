import { NgModule } from '@angular/core';
import { FundingInformationPageRoutingModule } from './funding-information-routing.module';
import { FundingInformationPage } from './container/funding-information.page';
import { SignupComponentsModule } from '../components';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';

@NgModule({
  imports: [SharedModule, SignupComponentsModule, FundingInformationPageRoutingModule],
  providers: [FACADE_SERVICE],
  declarations: [FundingInformationPage]
})
export class FundingInformationPageModule {}
