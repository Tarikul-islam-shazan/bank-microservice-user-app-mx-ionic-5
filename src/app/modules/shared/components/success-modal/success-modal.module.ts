import { NgModule } from '@angular/core';
import { SuccessModalPage } from './container/success-modal.page';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [SharedModule],
  exports: [SuccessModalPage],
  entryComponents: [SuccessModalPage],
  declarations: [SuccessModalPage]
})
export class SuccessModalPageModule {}
