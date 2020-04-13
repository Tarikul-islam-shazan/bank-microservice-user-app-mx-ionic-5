import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiaryInformationPage } from './container/beneficiary-information.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiaryInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficiaryInformationPageRoutingModule {}
