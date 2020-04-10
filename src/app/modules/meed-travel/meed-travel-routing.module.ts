import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeedTravelPage } from './container/meed-travel.page';

const routes: Routes = [
  {
    path: '',
    component: MeedTravelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeedTravelPageRoutingModule {}
