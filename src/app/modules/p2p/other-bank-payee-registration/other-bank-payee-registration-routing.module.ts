import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherBankPayeeRegistrationPage } from './container/other-bank-payee-registration.page';

const routes: Routes = [
  {
    path: '',
    component: OtherBankPayeeRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherBankPayeeRegistrationPageRoutingModule {}
