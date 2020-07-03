import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeedTravelPage } from './container/meed-travel.page';
import { WebsitePage } from './third-party-website/container/third-party-website.page';

const routes: Routes = [
  {
    path: '',
    component: MeedTravelPage
  },
  {
    path: 'website',
    component: WebsitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeedTravelPageRoutingModule {}
