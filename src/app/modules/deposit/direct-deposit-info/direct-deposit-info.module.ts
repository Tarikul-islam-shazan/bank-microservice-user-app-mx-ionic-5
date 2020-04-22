import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { DirectDepositInfoPage } from './container';
import { FACADE_SERVICE } from '@app/deposit/direct-deposit-info/facade';

const routes: Routes = [
  {
    path: '',
    component: DirectDepositInfoPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [FACADE_SERVICE],
  declarations: [DirectDepositInfoPage]
})
export class DirectDepositInfoPageModule {}
