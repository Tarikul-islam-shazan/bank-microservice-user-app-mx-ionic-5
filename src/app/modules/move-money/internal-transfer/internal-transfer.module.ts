import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';

import { MoveBetweenAccountsPage } from '@app/move-money/internal-transfer/move-between-accounts/container/move-between-accounts.page';
import { ConfirmDetailsPage } from '@app/move-money/internal-transfer/confirm-details';
import { ScheduledTransfersPage } from '@app/move-money/internal-transfer/scheduled-transfers';
import { CancelTransferPage } from '@app/move-money/internal-transfer/cancel-transfer';
import { COMPONENTS } from '@app/move-money/internal-transfer/components';

import { FACADE_SERVICE as INTERNAL_SERVICE_FACADE } from './move-between-accounts';
import { FACADE_SERVICE as CONFIRM_DETAILS_FACADE } from './confirm-details/';
import { FACADE_SERVICE as SCHEDULE_TRANSFER_FACADE } from './scheduled-transfers/';
import { FACADE_SERVICE as CANCEL_TRANSFER } from './cancel-transfer';
import { TransferService } from '@app/move-money/internal-transfer/services';
import { PAGES } from '@app/core/models/constants';

export const PAGE_CONTAINERS: any[] = [
  MoveBetweenAccountsPage,
  ConfirmDetailsPage,
  ScheduledTransfersPage,
  CancelTransferPage
];
export const ALL_FACADES: any[] = [
  ...INTERNAL_SERVICE_FACADE,
  ...CONFIRM_DETAILS_FACADE,
  ...SCHEDULE_TRANSFER_FACADE,
  TransferService,
  ...CANCEL_TRANSFER
];
const routes: Routes = [
  {
    path: '',
    component: MoveBetweenAccountsPage
  },
  {
    path: 'confirm-details',
    data: { title: PAGES.MOVE_BETWEEN_ACCOUNT_CONFIRM_DETAILS.NAME },
    component: ConfirmDetailsPage
  },
  {
    path: 'scheduled-transfers',
    data: { title: PAGES.SCHEDULED_TRANSFERS.NAME },
    component: ScheduledTransfersPage
  },
  {
    path: 'cancel-transfer',
    data: { title: PAGES.MOVE_BETWEEN_ACCOUNT_CANCEL_TRANSFER.NAME },
    component: CancelTransferPage
  }
];

@NgModule({
  entryComponents: [...COMPONENTS],
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...PAGE_CONTAINERS, ...COMPONENTS],
  providers: [...ALL_FACADES]
})
export class InternalTransferModule {}
