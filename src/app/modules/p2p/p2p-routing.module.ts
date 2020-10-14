import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PAGES } from '@app/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    data: { title: PAGES.P2P_HOME.NAME },
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'registration-type/:to',
    data: { title: PAGES.P2P_REGISTRATION_TYPE.NAME },
    loadChildren: () =>
      import('./payee-registration-type/payee-registration-type.module').then(m => m.PayeeRegistrationTypePageModule)
  },
  {
    path: 'invex-payee-registration',
    data: { title: PAGES.P2P_INVEX_PAYEE_REGISTRATION.NAME },
    loadChildren: () =>
      import('./invex-payee-registration/invex-payee-registration.module').then(m => m.InvexPayeeRegistrationPageModule)
  },
  {
    path: 'other-bank-payee-registration',
    data: { title: PAGES.P2P_OTHER_PAYEE_REGISTRATION.NAME },
    loadChildren: () =>
      import('./other-bank-payee-registration/other-bank-payee-registration.module').then(
        m => m.OtherBankPayeeRegistrationPageModule
      )
  },
  {
    path: 'edit-invex-payee-registration',
    loadChildren: () =>
      import('./edit-invex-payee-registration/edit-invex-payee-registration.module').then(
        m => m.EditInvexPayeeRegistrationPageModule
      )
  },
  {
    path: 'edit-other-bank-payee-registration',
    loadChildren: () =>
      import('./edit-other-bank-payee-registration/edit-other-bank-payee-registration.module').then(
        m => m.EditOtherBankPayeeRegistrationPageModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class P2PRoutingModule {}
