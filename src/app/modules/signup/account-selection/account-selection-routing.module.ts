import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountSelectionPage } from './container/account-selection.page';

const routes: Routes = [
  {
    path: '',
    component: AccountSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountSelectionPageRoutingModule {}
