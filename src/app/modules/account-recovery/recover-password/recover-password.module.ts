import { NgModule } from '@angular/core';
import { RecoverPasswordPage } from './container/recover-password.page';
import { SharedModule } from '@app/shared';
import { Routes, RouterModule } from '@angular/router';
import { SuccessModalPageModule } from '@app/shared/components/success-modal/success-modal.module';
import { FACADE_SERVICE } from './facade';
const routes: Routes = [
  {
    path: '',
    component: RecoverPasswordPage
  }
];
@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), SuccessModalPageModule],
  providers: [FACADE_SERVICE],
  declarations: [RecoverPasswordPage]
})
export class RecoverPasswordPageModule {}
