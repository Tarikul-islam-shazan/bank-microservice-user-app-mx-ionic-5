import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectDepositPage } from './container/direct-deposit.page';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';
import { DIRECT_DEPOSIT_COMPONENTS, DirectDepositInfoModalComponent } from './component/direct-deposit-info-modal';
const routes: Routes = [
  {
    path: '',
    component: DirectDepositPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [FACADE_SERVICE, ...DIRECT_DEPOSIT_COMPONENTS],
  declarations: [DirectDepositPage, ...DIRECT_DEPOSIT_COMPONENTS],
  entryComponents: [DirectDepositInfoModalComponent]
})
export class DirectDepositPageModule {}
