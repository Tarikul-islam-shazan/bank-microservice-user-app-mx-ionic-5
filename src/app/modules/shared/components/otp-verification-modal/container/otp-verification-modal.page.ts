import { Component, ViewChild } from '@angular/core';
import { IonContent, ModalController, IonInput } from '@ionic/angular';
import { OtpVerificationModalFacade } from '@app/shared/components/otp-verification-modal/facade/otp-verification-modal.facade';
import { REG_EX_PATTERNS } from '@app/core/models/patterns';
import { IinputOption, InputFormatType } from '@app/shared/directives/mask-input.directive';

enum OtpResponseType {
  invalid = '704',
  tooManyAttempts = '705'
}

@Component({
  selector: 'mbc-otp-verification-modal',
  templateUrl: './otp-verification-modal.page.html',
  styleUrls: ['./otp-verification-modal.page.scss']
})
export class OtpVerificationModalPage {
  // Reference of OTP input field

  codeError = false;
  isInput = true;

  @ViewChild('hiddenInput', { static: false }) hiddenInput: IonInput;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  verificationCode: string;
  emailVerification: IinputOption;
  /**
   * Issue: GMA-4162
   * Details: Otp auto focus and keyboard not showing issue
   * Date: Feb 05, 2020
   * Developer: Zahidul Islam <zahidul@bs-23.net>
   */

  constructor(private modalCtrl: ModalController, public facade: OtpVerificationModalFacade) {
    this.emailVerification = {
      type: InputFormatType.EMAIL_VERIFICATION
    };
  }

  ionViewDidEnter() {
    this.setFocus();
  }

  // Set focus on input field and open keyboard when modal opened
  setFocus() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1500);
    this.hiddenInput.setFocus();
  }

  resend() {
    this.isInput = true;
    this.facade.resendOtpCode();
    this.verificationCode = '';
  }

  verifyOtpCode() {
    // 6 otp token concatenate
    this.facade.verifyOtp(this.verificationCode).subscribe(
      resp => {
        this.validateOtpVerificationResponse(resp);
      },
      err => {
        this.validateOtpVerificationResponse(err);
      }
    );
  }

  validateOtpVerificationResponse(resp: any) {
    if (resp && !resp.status) {
      setTimeout(() => {
        this.dismiss(resp);
      }, 200);
    }
    if (resp && resp.status === 403) {
      const responseBody = resp.error.data;
      if (responseBody.code === OtpResponseType.invalid) {
        // invalid token
        this.codeError = true;
        setTimeout(() => {
          this.codeError = false;
          this.verificationCode = '';
        }, 1500);
      }
      if (responseBody.code === OtpResponseType.tooManyAttempts) {
        // too many attempts
        this.isInput = false;
      }
    }
  }

  dismiss(resp?: any) {
    // services are not called in the component, that's why modal service is not being used here
    this.modalCtrl.dismiss(resp);
  }

  trackVerificationCodeChange() {
    if (this.checkVerificationCodeValid()) {
      this.verifyOtpCode();
    }
  }

  checkVerificationCodeValid() {
    if (this.verificationCode.length === 6 && REG_EX_PATTERNS.OTP_VALIDATION.test(this.verificationCode)) {
      return true;
    }
    return false;
  }
}
