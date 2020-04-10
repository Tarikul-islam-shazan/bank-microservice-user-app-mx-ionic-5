import { NgModule } from '@angular/core';
import { OtpVerificationModalPage } from './container';
import { SharedModule } from '@app/shared/shared.module';
import { FACADE_SERVICE } from './facade';

@NgModule({
  entryComponents: [OtpVerificationModalPage],
  imports: [SharedModule],
  exports: [OtpVerificationModalPage],
  providers: [FACADE_SERVICE],
  declarations: [OtpVerificationModalPage]
})
export class OtpVerificationModalPageModule {}
