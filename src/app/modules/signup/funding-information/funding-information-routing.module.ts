import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundingInformationPage } from './container/funding-information.page';

const routes: Routes = [
  {
    path: '',
    component: FundingInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundingInformationPageRoutingModule {}
