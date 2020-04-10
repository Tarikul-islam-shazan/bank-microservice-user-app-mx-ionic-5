import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { DirectDepositInfoPage } from './container';

const routes: Routes = [
  {
    path: '',
    component: DirectDepositInfoPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [DirectDepositInfoPage]
})
export class DirectDepositInfoPageModule {}
