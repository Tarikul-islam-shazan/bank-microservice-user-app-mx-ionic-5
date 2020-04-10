import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginUserPage } from './container/index';

export const LOGIN_ROUTES: Routes = [
  {
    path: '',
    component: LoginUserPage
  }
];
@NgModule({
  imports: [RouterModule.forChild(LOGIN_ROUTES)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
