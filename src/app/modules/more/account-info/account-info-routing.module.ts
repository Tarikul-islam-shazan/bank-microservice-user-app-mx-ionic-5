import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PAGES } from '@app/core';
import { AccountInfoPage } from './container';
const routes: Routes = [
  {
    path: '',
    data: { title: PAGES.ACCOUNT_INFO.NAME },
    component: AccountInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountInfoRoutingModule {}
