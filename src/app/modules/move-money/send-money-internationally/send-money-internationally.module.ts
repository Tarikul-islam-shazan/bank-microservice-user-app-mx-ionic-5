import { NgModule } from '@angular/core';

import { SendMoneyInternationallyPage } from './container/send-money-internationally.page';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';

const routes: Routes = [
  {
    path: '',
    component: SendMoneyInternationallyPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [SendMoneyInternationallyPage],
  exports: [RouterModule]
})
export class SendMoneyInternationallyPageModule {}
