import { NgModule } from '@angular/core';
import { AccountRecoveryPage } from './container/account-recovery.page';
import { SharedModule } from '@app/shared';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: AccountRecoveryPage
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'recover-password',
    loadChildren: () => import('./recover-password/recover-password.module').then(m => m.RecoverPasswordPageModule)
  },
  {
    path: 'forgot-username',
    loadChildren: () => import('./forgot-username/forgot-username.module').then(m => m.ForgotUsernamePageModule)
  }
];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [AccountRecoveryPage]
})
export class AccountRecoveryPageModule {}
