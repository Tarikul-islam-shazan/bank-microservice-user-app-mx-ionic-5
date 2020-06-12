import { NgModule } from '@angular/core';
import { ForgotPasswordPage } from './container/forgot-password.page';
import { SharedModule } from '@app/shared';
import { Routes, RouterModule } from '@angular/router';
import { FACADE_SERVICE } from './facade';
import { NgxMaskModule } from 'ngx-mask';
import { OtpVerificationModalPageModule } from '@app/shared/components/otp-verification-modal/otp-verification-modal.module';
import { SuccessModalPageModule } from '@app/shared/components/success-modal/success-modal.module';
const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPage
  }
];
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    OtpVerificationModalPageModule,
    NgxMaskModule.forRoot(),
    SuccessModalPageModule
  ],
  providers: [FACADE_SERVICE],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule {}
