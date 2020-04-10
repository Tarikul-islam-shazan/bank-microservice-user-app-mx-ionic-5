import { NgModule } from '@angular/core';
import { CreditDebitCardPage } from './container/credit-debit-card.page';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';

const routes: Routes = [
  {
    path: '',
    component: CreditDebitCardPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [FACADE_SERVICE],
  declarations: [CreditDebitCardPage]
})
export class CreditDebitCardPageModule {}
