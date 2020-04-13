import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LivingInformationPage } from './container/living-information.page';

const routes: Routes = [
  {
    path: '',
    component: LivingInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivingInformationPageRoutingModule {}
