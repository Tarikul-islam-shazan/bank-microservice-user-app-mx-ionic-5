import { NgModule } from '@angular/core';
import { TransferFromOtherBankPage } from './container/transfer-from-other-bank.page';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';

const routes: Routes = [
  {
    path: '',
    component: TransferFromOtherBankPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [FACADE_SERVICE],
  declarations: [TransferFromOtherBankPage]
})
export class TransferFromOtherBankPageModule {}
