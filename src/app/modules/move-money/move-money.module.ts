import { NgModule } from '@angular/core';
import { MoveMoneyRoutingModule } from './move-money-routing.module';
import { SharedModule } from '@app/shared';
import { MoveMoneyPage } from './home/container/move-money.page';
import { FACADE_SERVICE } from './home/facade';
@NgModule({
  declarations: [MoveMoneyPage],
  imports: [SharedModule, MoveMoneyRoutingModule],
  providers: [FACADE_SERVICE]
})
export class MoveMoneyModule {}
