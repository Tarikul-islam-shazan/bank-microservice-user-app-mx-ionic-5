import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvexPayeeRegistrationPage } from './container/invex-payee-registration.page';

const routes: Routes = [
  {
    path: '',
    component: InvexPayeeRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvexPayeeRegistrationPageRoutingModule {}
