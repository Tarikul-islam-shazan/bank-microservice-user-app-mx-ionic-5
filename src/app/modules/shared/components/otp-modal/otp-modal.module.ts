import { NgModule } from '@angular/core';
import { OtpModalComponent } from './container';
import { SharedModule } from '@app/shared/shared.module';
import { SERVICE_PROVIDER } from './facade';

@NgModule({
  entryComponents: [OtpModalComponent],
  imports: [SharedModule],
  providers: [SERVICE_PROVIDER],
  declarations: [OtpModalComponent]
})
export class OtpModalComponentModule {}
