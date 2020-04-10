import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { LoginRoutingModule } from './login-routing.module';
import { FACADE_SERVICE } from './facade/index';
import { LoginUserPage } from './container';

@NgModule({
  declarations: [LoginUserPage],
  imports: [SharedModule, LoginRoutingModule],
  providers: [...FACADE_SERVICE]
})
export class LoginModule {}
