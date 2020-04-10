import { NgModule } from '@angular/core';
import { ChangePasswordPage } from './container/change-password.page';
import { SharedModule } from '@app/shared';
import { Routes, RouterModule } from '@angular/router';
import { SuccessModalPageModule } from '@app/shared/components/success-modal/success-modal.module';
import { FACADE_SERVICE } from './facade';
const routes: Routes = [
  {
    path: '',
    component: ChangePasswordPage
  }
];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), SuccessModalPageModule],
  providers: [FACADE_SERVICE],
  declarations: [ChangePasswordPage]
})
export class ChangePasswordPageModule {}
