import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'registration-type/:to',
    loadChildren: () =>
      import('./payee-registration-type/payee-registration-type.module').then(m => m.PayeeRegistrationTypePageModule)
  },
  {
    path: 'invex-payee-registration',
    loadChildren: () =>
      import('./invex-payee-registration/invex-payee-registration.module').then(m => m.InvexPayeeRegistrationPageModule)
  },
  {
    path: 'other-bank-payee-registration',
    loadChildren: () =>
      import('./other-bank-payee-registration/other-bank-payee-registration.module').then(
        m => m.OtherBankPayeeRegistrationPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P2PRoutingModule {}
