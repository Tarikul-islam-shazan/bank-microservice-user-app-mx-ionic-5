/**
 * Feature: Module
 * Details: This module of choose contacts.
 * Date: March 30, 2020
 * Developer: Rahadur Rahman <rahadur.rahman@brainstation23.com>
 */
import { NgModule } from '@angular/core';
import { ChooseContactPage } from './container/choose-contact.page';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';

@NgModule({
  imports: [SharedModule],
  providers: [FACADE_SERVICE],
  exports: [ChooseContactPage],
  entryComponents: [ChooseContactPage],
  declarations: [ChooseContactPage]
})
export class ChooseContactModule {}
