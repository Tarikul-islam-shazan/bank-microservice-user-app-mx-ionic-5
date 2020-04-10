import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateLoginPage } from './container/create-login.page';
import { SharedModule } from '@app/shared';
import { SignupComponentsModule } from '@app/signup/components';
import { FACADE_SERVICE } from './facade';
const routes: Routes = [
  {
    path: '',
    component: CreateLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule, SignupComponentsModule],
  providers: [FACADE_SERVICE],
  declarations: [CreateLoginPage]
})
export class CreateLoginPageModule {}
