import { NgModule } from '@angular/core';
import { AddressInformationPageRoutingModule } from './address-information-routing.module';
import { FACADE_SERVICE } from './facade';
import { AddressInformationPage } from './container/address-information.page';
import { SignupComponentsModule } from '../components';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [SharedModule, SignupComponentsModule, AddressInformationPageRoutingModule],
  providers: [FACADE_SERVICE],
  declarations: [AddressInformationPage]
})
export class AddressInformationPageModule {}
