import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditInvexPayeeRegistrationPage } from './container/edit-invex-payee-registration.page';

const routes: Routes = [
  {
    path: '',
    component: EditInvexPayeeRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditInvexPayeeRegistrationPageRoutingModule {}
