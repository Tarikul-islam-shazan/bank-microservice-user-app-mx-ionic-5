import { ChangeAddressPageModule } from './change-address/change-address.module';
import { ChangeEmailPageModule } from './change-email/change-email.module';
import { ChangeNicknamePageModule } from './change-nickname/change-nickname.module';
import { ChangePhonePageModule } from './change-phone/change-phone.module';
import { NgModule } from '@angular/core';
import { OtpVerificationModalPageModule } from '@app/shared/components/otp-verification-modal/otp-verification-modal.module';
import { PersonalDetailsPage } from './container/personal-details.page';
import { RouterModule, Routes } from '@angular/router';
import { SERVICE_PROVIDER } from './facade';
import { SharedModule } from '@app/shared';
import { ChangeAddressPage } from './change-address/container/change-address.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalDetailsPage
  },
  {
    path: 'change-address',
    component: ChangeAddressPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ChangeNicknamePageModule,
    ChangeAddressPageModule,
    ChangeEmailPageModule,
    ChangePhonePageModule,
    OtpVerificationModalPageModule
  ],
  providers: [SERVICE_PROVIDER],
  declarations: [PersonalDetailsPage]
})
export class PersonalDetailsModule {}
