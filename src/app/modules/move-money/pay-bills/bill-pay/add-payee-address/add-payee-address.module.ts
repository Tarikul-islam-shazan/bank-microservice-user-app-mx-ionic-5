import { NgModule } from '@angular/core';
import { AddPayeeAddressPage } from './container/add-payee-address.page';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';
import { NgxMaskModule } from 'ngx-mask';
import { SuccessModalPageModule } from '@app/shared/components/success-modal/success-modal.module';

@NgModule({
  exports: [AddPayeeAddressPage],
  imports: [SharedModule, NgxMaskModule.forRoot(), SuccessModalPageModule],
  entryComponents: [AddPayeeAddressPage],
  providers: [FACADE_SERVICE],
  declarations: [AddPayeeAddressPage]
})
export class AddPayeeAddressPageModule {}
