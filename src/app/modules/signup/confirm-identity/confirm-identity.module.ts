import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmIdentityPage } from './container/confirm-identity.page';
import { SharedModule } from '@app/shared';
import { SignupComponentsModule } from '@app/signup/components';
import { FACADE_SERVICE } from './facade';
const routes: Routes = [
  {
    path: '',
    component: ConfirmIdentityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule, SignupComponentsModule],
  providers: [FACADE_SERVICE],
  declarations: [ConfirmIdentityPage]
})
export class ConfirmIdentityPageModule {}
