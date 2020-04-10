import { ChangePhonePage } from './container/change-phone.page';
import { FACADE_SERVICE } from './facade';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [SharedModule],
  providers: [FACADE_SERVICE],
  entryComponents: [ChangePhonePage],
  declarations: [ChangePhonePage]
})
export class ChangePhonePageModule {}
