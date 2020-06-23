import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayeeRegistrationTypePageRoutingModule } from './payee-registration-type-routing.module';

import { PayeeRegistrationTypePage } from './container/payee-registration-type.page';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [SharedModule, PayeeRegistrationTypePageRoutingModule],
  declarations: [PayeeRegistrationTypePage]
})
export class PayeeRegistrationTypePageModule {}
