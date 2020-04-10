import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoneyPage } from './container/money.page';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';

const routes: Routes = [
  {
    path: '',
    component: MoneyPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [FACADE_SERVICE],
  declarations: [MoneyPage]
})
export class MoneyPageModule {}
