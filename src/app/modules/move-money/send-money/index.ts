/**
 * Index: Send money module
 * Details: Send money module index.
 * Contains all the dependent components, facades, pages container, pipes
 * Date: January 28, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */
import { HomePage } from '@app/move-money/send-money/home/container/home.page';
import { HomeFacade } from '@app/move-money/send-money/home/facade/facade';

import { EditPage } from '@app/move-money/send-money/edit/container/edit.page';
import { EditFacade } from '@app/move-money/send-money/edit/facade/facade';

import { ConfirmPage } from '@app/move-money/send-money/confirm/container/confirm.page';
import { ConfirmFacade } from '@app/move-money/send-money/confirm/facade/facade';

import { ContactModifyPage } from '@app/move-money/send-money/contact-modify/container/contact-modify.page';
import { ContactModifyFacade } from '@app/move-money/send-money/contact-modify/facade/facade';

import { RequestDetailsPage } from '@app/move-money/send-money/request-details/container/request-details.page';
import { RequestDetailsFacade } from '@app/move-money/send-money/request-details/facade/facade';

export const PAGE_CONTAINERS: any[] = [HomePage, EditPage, ConfirmPage, ContactModifyPage, RequestDetailsPage];
export const ALL_FACADES: any[] = [HomeFacade, EditFacade, ConfirmFacade, ContactModifyFacade, RequestDetailsFacade];

export * from '@app/move-money/send-money/home/container/home.page';
export * from '@app/move-money/send-money/edit/container/edit.page';
export * from '@app/move-money/send-money/confirm/container/confirm.page';
export * from '@app/move-money/send-money/contact-modify/container/contact-modify.page';
export * from '@app/move-money/send-money/request-details/container/request-details.page';
export * from '@app/move-money/send-money/components';
export * from '@app/move-money/send-money/pipes';
