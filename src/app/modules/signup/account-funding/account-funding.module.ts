import { NgModule } from '@angular/core';
import { AccountFundingRoutingModule } from './account-funding-routing.module';
import { AccountFundingPage } from './container';
import { AccountFunding } from './facade';
import { SharedModule } from '@app/shared';
import { FundingOptionPage } from './funding-option/container';
import { FundingOption } from './funding-option/facade';

@NgModule({
  declarations: [AccountFundingPage, FundingOptionPage],
  providers: [AccountFunding, FundingOption],
  imports: [SharedModule, AccountFundingRoutingModule]
})
export class AccountFundingModule {}
