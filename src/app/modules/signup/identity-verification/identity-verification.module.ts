import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdentityVerificationPage } from './container/identity-verification.page';
import { SharedModule } from '@app/shared';
import { SignupComponentsModule } from '@app/signup/components';
import { FACADE_SERVICE } from './facade';
const routes: Routes = [
  {
    path: '',
    component: IdentityVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule, SignupComponentsModule],
  declarations: [IdentityVerificationPage],
  providers: [...FACADE_SERVICE]
})
export class IdentityVerificationPageModule {}
