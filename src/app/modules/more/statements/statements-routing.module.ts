import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PAGES } from '@app/core';
import { StatementsPage } from './container';
const routes: Routes = [
  {
    path: '',
    data: { title: PAGES.STATEMENTS.NAME },
    component: StatementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatementsRoutingModule {}
