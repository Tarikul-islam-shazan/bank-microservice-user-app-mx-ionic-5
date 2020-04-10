import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressPage } from './container/address.page';
import { SharedModule } from '@app/shared';
import { SignupComponentsModule } from '@app/signup/components';
import { FACADE_SERVICE } from './facade';
import { NgxMaskModule } from 'ngx-mask';
const routes: Routes = [
  {
    path: '',
    component: AddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule, SignupComponentsModule, NgxMaskModule.forRoot()],
  providers: [FACADE_SERVICE],
  declarations: [AddressPage]
})
export class AddressPageModule {}
