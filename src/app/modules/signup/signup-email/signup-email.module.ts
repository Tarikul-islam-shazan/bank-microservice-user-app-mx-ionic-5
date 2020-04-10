import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { Routes, RouterModule } from '@angular/router';

import { SignupEmailPage } from './container/signup-email.page';
import { FACADE_SERVICE } from './facade/index';

const routes: Routes = [
  {
    path: '',
    component: SignupEmailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  providers: [...FACADE_SERVICE],
  declarations: [SignupEmailPage]
})
export class SignupEmailPageModule {}
