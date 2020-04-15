import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GovernmentDisclosurePage } from './container/government-disclosure.page';

const routes: Routes = [
  {
    path: '',
    component: GovernmentDisclosurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GovernmentDisclosurePageRoutingModule {}
