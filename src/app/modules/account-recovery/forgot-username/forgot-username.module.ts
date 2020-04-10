import { NgModule } from '@angular/core';
import { ForgotUsernamePage } from './container/forgot-username.page';
import { SharedModule } from '@app/shared';
import { Routes, RouterModule } from '@angular/router';
import { FACADE_SERVICE } from './facade';
import { SuccessModalPageModule } from '@app/shared/components/success-modal/success-modal.module';
const routes: Routes = [
  {
    path: '',
    component: ForgotUsernamePage
  }
];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), SuccessModalPageModule],
  providers: [FACADE_SERVICE],
  declarations: [ForgotUsernamePage]
})
export class ForgotUsernamePageModule {}
