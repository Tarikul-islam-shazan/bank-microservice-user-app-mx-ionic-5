import { NgModule } from '@angular/core';
import { DirectDepositSetupPage } from './container/direct-deposit-setup.page';
import { SharedModule } from '@app/shared';
import { RouterModule, Routes } from '@angular/router';
import { FACADE_SERVICE } from './facade';
import { DIRECT_DEPOSIT_SETUP_COMPONENTS, DirectDepositInfoComponent } from './components/direct-deposit-info';

const routes: Routes = [
  {
    path: '',
    component: DirectDepositSetupPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [FACADE_SERVICE, ...DIRECT_DEPOSIT_SETUP_COMPONENTS],
  declarations: [DirectDepositSetupPage, ...DIRECT_DEPOSIT_SETUP_COMPONENTS],
  entryComponents: [DirectDepositInfoComponent]
})
export class DirectDepositSetupPageModule {}
