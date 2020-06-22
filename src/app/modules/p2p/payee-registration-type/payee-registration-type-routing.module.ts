import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayeeRegistrationTypePage } from './container/payee-registration-type.page';

const routes: Routes = [
  {
    path: '',
    component: PayeeRegistrationTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayeeRegistrationTypePageRoutingModule {}
