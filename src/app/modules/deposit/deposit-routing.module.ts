import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PAGES } from '@app/core';

const routes: Routes = [
  {
    path: 'direct-deposit-start',
    data: { title: PAGES.DIRECT_DEPOSIT_START.NAME },
    loadChildren: () =>
      import('./direct-deposit-start/direct-deposit-start.module').then(m => m.DirectDepositStartPageModule)
  },
  {
    path: 'direct-deposit-info',
    data: { title: PAGES.DIRECT_DEPOSIT_INFO.NAME },
    loadChildren: () =>
      import('./direct-deposit-info/direct-deposit-info.module').then(m => m.DirectDepositInfoPageModule)
  },
  {
    path: 'direct-deposit',
    data: { title: PAGES.DIRECT_DEPOSIT.NAME },
    loadChildren: () => import('./direct-deposit/direct-deposit.module').then(m => m.DirectDepositPageModule)
  },
  {
    path: 'direct-deposit-complete',
    data: { title: PAGES.DIRECT_DEPOSIT_COMPLETE.NAME },
    loadChildren: () =>
      import('./direct-deposit-complete/direct-deposit-complete.module').then(m => m.DirectDepositCompletePageModule)
  },
  {
    path: 'money',
    data: { title: PAGES.DIRECT_DEPOSIT_MONEY.NAME },
    loadChildren: () => import('./money/money.module').then(m => m.MoneyPageModule)
  },
  {
    path: 'direct-deposit-setup',
    data: { title: PAGES.DIRECT_DEPOSIT_SETUP.NAME },
    loadChildren: () =>
      import('./direct-deposit-setup/direct-deposit-setup.module').then(m => m.DirectDepositSetupPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositRoutingModule {}
