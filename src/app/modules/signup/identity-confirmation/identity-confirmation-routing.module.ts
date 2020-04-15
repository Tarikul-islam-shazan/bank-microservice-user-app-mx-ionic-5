import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentityConfirmationPage } from './container/identity-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: IdentityConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdentityConfirmationPageRoutingModule {}
