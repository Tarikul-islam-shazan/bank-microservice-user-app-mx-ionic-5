import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { Routes, RouterModule } from '@angular/router';
import { ContactInfoPage } from '@app/move-money/send-money/ipay/contact-info/container/contact-info.page';
import { ContactInfoFacade } from '@app/move-money/send-money/ipay/contact-info/facade/facade';

import { ContactKeywordPage } from '@app/move-money/send-money/ipay/contact-keyword/container/contact-keyword.page';
import { ContactKeywordFacade } from '@app/move-money/send-money/ipay/contact-keyword/facade/facade';
import { OtpModalComponentModule } from '@app/shared/components/otp-modal/otp-modal.module';

const ALL_FACADES: any[] = [ContactInfoFacade, ContactKeywordFacade];
const PAGE_CONTAINERS: any[] = [ContactInfoPage, ContactKeywordPage];
const routes: Routes = [
  {
    path: 'contact-info',
    component: ContactInfoPage
  },
  {
    path: 'contact-keyword',
    component: ContactKeywordPage
  }
];

@NgModule({
  entryComponents: [],
  imports: [SharedModule, RouterModule.forChild(routes), OtpModalComponentModule],
  declarations: [...PAGE_CONTAINERS],
  providers: [...ALL_FACADES]
})
export class IpayModule {}
