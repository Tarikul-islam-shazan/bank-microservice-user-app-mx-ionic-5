import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { AccountInfoPage } from './container';
import { AccountInfoRoutingModule } from './account-info-routing.module';
import { ACCOUNT_INFO_FACADE_SERVICE } from './facade';

@NgModule({
  imports: [AccountInfoRoutingModule, SharedModule],
  providers: [...ACCOUNT_INFO_FACADE_SERVICE],
  declarations: [AccountInfoPage]
})
export class AccountInfoPageModule {}
