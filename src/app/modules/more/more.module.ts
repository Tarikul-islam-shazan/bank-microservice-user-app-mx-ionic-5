/**
 * Feature: More options
 * Details: Meed more options page module.
 * Date: 07/02/2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 */
import { NgModule } from '@angular/core';
import { MoreRoutingModule } from './more-routing.module';
import { MorePage } from './container/more.page';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';
@NgModule({
  declarations: [MorePage],
  imports: [SharedModule, MoreRoutingModule],
  providers: [...FACADE_SERVICE]
})
export class MoreModule {}
