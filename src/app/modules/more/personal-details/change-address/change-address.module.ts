import { ChangeAddressPage } from './container/change-address.page';
import { NgModule } from '@angular/core';
import { OtpModalComponentModule } from '@app/shared/components/otp-modal/otp-modal.module';
import { SERVICE_PROVIDER } from './facade';
import { SharedModule } from '@app/shared';
import { ChangeAddressService } from '@app/more/personal-details/change-address/services/change-address.service';
import { AddressSuccessModalComponent } from './components/address-success-modal/address-success-modal.component';
@NgModule({
  entryComponents: [ChangeAddressPage, AddressSuccessModalComponent],
  imports: [SharedModule, OtpModalComponentModule],
  providers: [SERVICE_PROVIDER, ChangeAddressService],
  declarations: [ChangeAddressPage, AddressSuccessModalComponent]
})
export class ChangeAddressPageModule {}
