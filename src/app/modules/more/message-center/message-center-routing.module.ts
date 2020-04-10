import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageCenterPage } from './container/message-center.page';

const routes: Routes = [
  {
    path: '',
    component: MessageCenterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageCenterPageRoutingModule {}
