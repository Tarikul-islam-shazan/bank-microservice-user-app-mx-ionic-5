import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PAGES } from '@app/core';
import { AccountFundingPage } from './container';
import { FundingOptionPage } from './funding-option/container';

const routes: Routes = [
  {
    path: '',
    component: AccountFundingPage
  },
  {
    path: 'funding-option',
    data: { title: PAGES.SIGNUP_ACCOUNT_FUNDING_OPTION.NAME },
    component: FundingOptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountFundingRoutingModule {}
