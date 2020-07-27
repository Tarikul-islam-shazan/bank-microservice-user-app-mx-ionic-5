import { TopUpPaymentPage } from './container/top-up-payment.page';
import { CurrencyPipe } from '@angular/common';
import { FACADE_SERVICE } from './facade';
import { NgModule } from '@angular/core';
import { OtpModalComponentModule } from '@app/shared/components/otp-modal/otp-modal.module';
import { SharedModule } from '@app/shared';
import { SuccessModalPageModule } from '@app/shared/components/success-modal/success-modal.module';

@NgModule({
  exports: [TopUpPaymentPage],
  entryComponents: [TopUpPaymentPage],
  imports: [SharedModule, OtpModalComponentModule, SuccessModalPageModule],
  providers: [FACADE_SERVICE, CurrencyPipe],
  declarations: [TopUpPaymentPage]
})
export class TopUpPaymentPageModule {}
