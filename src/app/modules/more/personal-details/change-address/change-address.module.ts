import { ChangeAddressPage } from './container/change-address.page';
import { NgModule } from '@angular/core';
import { OtpModalComponentModule } from '@app/shared/components/otp-modal/otp-modal.module';
import { SERVICE_PROVIDER } from './facade';
import { SharedModule } from '@app/shared';
import { ChangeAddressService } from '@app/more/personal-details/change-address/services/change-address.service';
@NgModule({
  entryComponents: [ChangeAddressPage],
  imports: [SharedModule, OtpModalComponentModule],
  providers: [SERVICE_PROVIDER, ChangeAddressService],
  declarations: [ChangeAddressPage]
})
export class ChangeAddressPageModule {}
