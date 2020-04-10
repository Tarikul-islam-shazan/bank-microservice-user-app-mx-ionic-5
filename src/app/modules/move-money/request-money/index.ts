/**
 * Index: Request money module
 * Details: Request money module index.
 * Contains all the dependent components, facades, pages container, pipes
 * Date: January 28, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */
import { HomePage } from '@app/move-money/request-money/home/container/home.page';
import { HomeFacade } from '@app/move-money/request-money/home/facade/facade';

import { SelectedPage } from '@app/move-money/request-money/selected/container/selected.page';
import { SelectedFacade } from '@app/move-money/request-money/selected/facade/facade';

import { EditPage } from '@app/move-money/request-money/edit/container/edit.page';
import { EditFacade } from '@app/move-money/request-money/edit/facade/facade';

import { CancelPage } from '@app/move-money/request-money/cancel/container/cancel.page';
import { CancelFacade } from '@app/move-money/request-money/cancel/facade/facade';

import { ConfirmPage } from '@app/move-money/request-money/confirm/container/confirm.page';
import { ConfirmFacade } from '@app/move-money/request-money/confirm/facade/facade';

export const PAGE_CONTAINERS: any[] = [HomePage, SelectedPage, EditPage, CancelPage, ConfirmPage];
export const ALL_FACADES: any[] = [HomeFacade, SelectedFacade, EditFacade, CancelFacade, ConfirmFacade];

export * from '@app/move-money/request-money/home/container/home.page';
export * from '@app/move-money/request-money/selected/container/selected.page';
export * from '@app/move-money/request-money/edit/container/edit.page';
export * from '@app/move-money/request-money/cancel/container/cancel.page';
export * from '@app/move-money/request-money/confirm/container/confirm.page';
export * from '@app/move-money/request-money/components';
export * from '@app/move-money/request-money/pipes';
