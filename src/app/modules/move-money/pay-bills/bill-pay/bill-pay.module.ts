import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { BillPayPage } from './container/bill-pay.page';
import { SharedModule } from '@app/shared';
import { BillPayFacade } from './facade';
import { OtpVerificationModalPageModule } from '@app/shared/components/otp-verification-modal/otp-verification-modal.module';

@NgModule({
  exports: [BillPayPage],
  imports: [SharedModule, NgxMaskModule.forRoot(), OtpVerificationModalPageModule],
  entryComponents: [BillPayPage],
  providers: [BillPayFacade],
  declarations: [BillPayPage]
})
export class BillPayPageModule {}
