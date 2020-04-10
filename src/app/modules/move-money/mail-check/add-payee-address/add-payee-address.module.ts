import { NgModule } from '@angular/core';
import { AddPayeeAddressPage } from './container/add-payee-address.page';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';
import { NgxMaskModule } from 'ngx-mask';
import { AddPayeeFacade } from '../add-payee/facade';
import { OtpModalFacade } from '@app/shared/components/otp-modal/facade';
import { OtpModalComponentModule } from '@app/shared/components/otp-modal/otp-modal.module';
import { SuccessModalPageModule } from '@app/shared/components/success-modal/success-modal.module';

@NgModule({
  exports: [AddPayeeAddressPage],
  imports: [SharedModule, NgxMaskModule.forRoot(), OtpModalComponentModule, SuccessModalPageModule],
  entryComponents: [AddPayeeAddressPage],
  providers: [FACADE_SERVICE],
  declarations: [AddPayeeAddressPage]
})
export class AddPayeeAddressPageModule {}
