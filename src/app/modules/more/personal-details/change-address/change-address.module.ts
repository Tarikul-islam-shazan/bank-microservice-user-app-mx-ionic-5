import { ChangeAddressPage } from './container/change-address.page';
import { NgModule } from '@angular/core';
import { OtpModalComponentModule } from '@app/shared/components/otp-modal/otp-modal.module';
import { SERVICE_PROVIDER } from './facade';
import { SharedModule } from '@app/shared';
@NgModule({
  entryComponents: [ChangeAddressPage],
  imports: [SharedModule, OtpModalComponentModule],
  providers: [SERVICE_PROVIDER],
  declarations: [ChangeAddressPage]
})
export class ChangeAddressPageModule {}
