import { NgModule } from '@angular/core';
import { SignupRoutingModule } from './signup-routing.module';
import { CoreModule } from '../core/core.module';
import { EventTrackingDirective } from '../shared/directives/event-tracking.directive';
import { SharedModule } from '@app/shared';

@NgModule({
  entryComponents: [],
  declarations: [],
  imports: [SignupRoutingModule, SharedModule],
  exports: []
})
export class SignupModule {}
