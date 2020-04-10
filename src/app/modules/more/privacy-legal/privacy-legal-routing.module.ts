import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacyLegalPage } from './container/privacy-legal.page';

const routes: Routes = [
  {
    path: '',
    component: PrivacyLegalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyLegalPageRoutingModule {}
