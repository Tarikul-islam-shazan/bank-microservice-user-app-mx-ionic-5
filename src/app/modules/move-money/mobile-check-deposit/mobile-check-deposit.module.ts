import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { MobileCheckDepositPage } from './container/mobile-check-deposit.page';
import { COMPONENTS } from '@app/move-money/mobile-check-deposit/components';
import { FACADE_SERVICE } from '@app/move-money/mobile-check-deposit/facade';
import { MOBILE_CHECK_PROVIDERS } from '@app/move-money/mobile-check-deposit/services';
const routes: Routes = [
  {
    path: '',
    component: MobileCheckDepositPage
  }
];

@NgModule({
  entryComponents: [...COMPONENTS],
  declarations: [MobileCheckDepositPage, ...COMPONENTS],
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [...FACADE_SERVICE, ...MOBILE_CHECK_PROVIDERS]
})
export class MobileCheckDepositModule {}
