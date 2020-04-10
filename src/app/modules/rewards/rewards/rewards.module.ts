import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RewardsPage } from './container/rewards.page';
import { SharedModule } from '@app/shared';

const routes: Routes = [
  {
    path: '',
    component: RewardsPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [RewardsPage]
})
export class RewardsPageModule {}
