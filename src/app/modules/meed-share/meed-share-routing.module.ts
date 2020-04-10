import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeedSharePage } from './container/meed-share.page';

const routes: Routes = [
  {
    path: '',
    component: MeedSharePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeedSharePageRoutingModule {}
