import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OtpService } from '@app/core/services/otp.service';
import { Observable } from 'rxjs';

@Injectable()
export class OtpVerificationModalFacade {
  constructor(private service: OtpService, private modalCtrl: ModalController) {}

  verifyOtp(otpToken: string): Observable<any> {
    return this.service.verifyOtpCode(otpToken);
  }

  resendOtpCode() {
    this.service.resendOtpCode();
  }
}
