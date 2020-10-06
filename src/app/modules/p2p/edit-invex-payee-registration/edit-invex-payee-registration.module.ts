import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditInvexPayeeRegistrationPageRoutingModule } from './edit-invex-payee-registration-routing.module';

import { EditInvexPayeeRegistrationPage } from './container/edit-invex-payee-registration.page';
import { FACADE_SERVICE } from './facade';
import { SharedModule } from '@app/shared';
import { SuccessModalPageModule } from '@app/shared/components/success-modal/success-modal.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    EditInvexPayeeRegistrationPageRoutingModule,
    SuccessModalPageModule
  ],
  declarations: [EditInvexPayeeRegistrationPage],
  providers: [...FACADE_SERVICE]
})
export class EditInvexPayeeRegistrationPageModule {}
