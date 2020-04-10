import { NgModule } from '@angular/core';
import { PrivacyLegalPageRoutingModule } from './privacy-legal-routing.module';
import { PrivacyLegalPage } from './container/privacy-legal.page';
import { SharedModule } from '@app/shared/shared.module';
import { FACADE_SERVICE } from './facade';
import { PRIVACY_LEGAL_SERVICE } from './service';

@NgModule({
  imports: [SharedModule, PrivacyLegalPageRoutingModule],
  providers: [...FACADE_SERVICE, ...PRIVACY_LEGAL_SERVICE],
  declarations: [PrivacyLegalPage]
})
export class PrivacyLegalPageModule {}
