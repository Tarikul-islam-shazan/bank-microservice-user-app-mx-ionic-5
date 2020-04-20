import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressInformationPage } from './container/address-information.page';

const routes: Routes = [
  {
    path: '',
    component: AddressInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressInformationPageRoutingModule {}
