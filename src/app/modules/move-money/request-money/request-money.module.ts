/**
 * Feature: Request money
 * Details: Send p2p request money to meed members. Manage existing requests and contact list.
 * Date: January 8th, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */

import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { Routes, RouterModule } from '@angular/router';
import { PAGES } from '@app/core/models/constants';
import {
  ALL_FACADES,
  PAGE_CONTAINERS,
  COMPONENTS,
  PIPES,
  HomePage,
  EditPage,
  ConfirmPage,
  SelectedPage,
  CancelPage
} from '@app/move-money/request-money';
const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'selected',
    component: SelectedPage,
    data: { title: PAGES.REQUEST_MONEY_SELECTED.NAME }
  },
  {
    path: 'edit',
    component: EditPage,
    data: { title: PAGES.REQUEST_MONEY_EDIT.NAME }
  },
  {
    path: 'cancel',
    component: CancelPage,
    data: { title: PAGES.REQUEST_MONEY_CANCEL.NAME }
  },
  {
    path: 'confirm',
    component: ConfirmPage,
    data: { title: PAGES.REQUEST_MONEY_CONFIRM.NAME }
  }
];
@NgModule({
  entryComponents: [...COMPONENTS],
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [...PAGE_CONTAINERS, ...COMPONENTS, ...PIPES],
  providers: [...ALL_FACADES]
})
export class RequestMoneyModule {}
