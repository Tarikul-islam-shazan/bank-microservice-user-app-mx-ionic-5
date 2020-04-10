import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { StatementsPage } from './container';
import { StatementsRoutingModule } from './statements-routing.module';
import { STATEMENTS_FACADE_SERVICE } from './facade';

@NgModule({
  imports: [StatementsRoutingModule, SharedModule],
  declarations: [StatementsPage],
  providers: [...STATEMENTS_FACADE_SERVICE]
})
export class StatementsPageModule {}
