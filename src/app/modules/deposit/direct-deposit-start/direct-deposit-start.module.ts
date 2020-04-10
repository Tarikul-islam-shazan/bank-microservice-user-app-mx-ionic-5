import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { DirectDepositStartPage } from './container/';

const routes: Routes = [
  {
    path: '',
    component: DirectDepositStartPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [DirectDepositStartPage]
})
export class DirectDepositStartPageModule {}
