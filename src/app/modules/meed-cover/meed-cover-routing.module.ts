import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeedCoverPage } from './container/meed-cover.page';

const routes: Routes = [
  {
    path: '',
    component: MeedCoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeedCoverPageRoutingModule {}
