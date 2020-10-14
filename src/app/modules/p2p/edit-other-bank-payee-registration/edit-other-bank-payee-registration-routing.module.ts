import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditOtherBankPayeeRegistrationPage } from './container/edit-other-bank-payee-registration.page';

const routes: Routes = [
  {
    path: '',
    component: EditOtherBankPayeeRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditOtherBankPayeeRegistrationPageRoutingModule {}
