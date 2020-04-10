import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController, IonInput } from '@ionic/angular';
import { OtpVerificationModalFacade } from '../facade';

@Component({
  selector: 'mbc-otp-verification-modal',
  templateUrl: './otp-verification-modal.page.html',
  styleUrls: ['./otp-verification-modal.page.scss']
})
export class OtpVerificationModalPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;
  // Reference of OTP input field
  @ViewChild('f1', { static: false }) f1: IonInput;
  @ViewChild('f2', { static: false }) f2: IonInput;
  @ViewChild('f3', { static: false }) f3: IonInput;
  @ViewChild('f4', { static: false }) f4: IonInput;
  @ViewChild('f5', { static: false }) f5: IonInput;
  @ViewChild('f6', { static: false }) f6: IonInput;
  otp1: string;
  otp2: string;
  otp3: string;
  otp4: string;
  otp5: string;
  otp6: string;

  codeError = false;
  isInput = true;

  /**
   * Issue: GMA-4162
   * Details: Otp auto focus and keyboard not showing issue
   * Date: Feb 05, 2020
   * Developer: Zahidul Islam <zahidul@bs-23.net>
   */

  constructor(private modalCtrl: ModalController, public facade: OtpVerificationModalFacade) {}

  ngOnInit() {
    this.setFocus();
  }

  // OTP code autofill function; Split 6 digit string and assign it to  6 input field
  autoOtpFill() {
    if (this.otp1 && this.otp1.length === 6) {
      const otps: string[] = this.otp1.split('');
      otps.forEach((otp, i) => {
        const index = i + 1;
        this['otp' + index] = otp;
      });
      this.otpCodeChanged(6);
    }
  }

  // input code change detect and check is it type otp or backspace
  otpCodeChanged(index: number) {
    setTimeout(() => {
      if (this['otp' + index]) {
        this.setReadOnly(index, false);
      }
    }, 100);
    setTimeout(() => {
      if (!this['otp' + index]) {
        this.setReadOnly(index, true);
      }
    }, 170);
  }

  // Set read only in input field except current input
  setReadOnly(i: number, isBackSpace: boolean) {
    this.setForwardOtpReadOnly(i);
    this.setBackwardOtpReadOnly(i);
    if (isBackSpace) {
      const index = i > 1 ? i - 1 : 1;
      this['otp' + index] = null;
      this['f' + index].readonly = false;
      this['f' + index].setFocus();
    } else {
      const index = i < 6 ? i + 1 : 6;
      this['f' + index].readonly = false;
      this['f' + index].setFocus();
    }
    if (i === 6) {
      this.verifyOtpCode();
    }
  }

  // Set read only in input field
  setForwardOtpReadOnly(i: number) {
    if (i < 6) {
      for (i; i < 7; i++) {
        this['f' + i].readonly = true;
      }
    }
  }

  // Set read only in input field
  setBackwardOtpReadOnly(i: number) {
    if (i > 1) {
      for (i; i > 0; i--) {
        this['f' + i].readonly = true;
      }
    }
  }

  // Set focus on input field and open keyboard when modal opened
  setFocus() {
    setTimeout(() => {
      this.content.scrollToBottom();
      this.f1.setFocus();
      this.otpCodeChanged(1);
    }, 500);
  }

  resend() {
    this.isInput = true;
    this.facade.resendOtpCode();
  }

  verifyOtpCode() {
    // 6 otp token concatenate
    const otpToken: string = this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6;
    this.facade.verifyOtp(otpToken).subscribe(
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
      if (responseBody.code === '704') {
        this.codeError = true;
        setTimeout(() => {
          this.codeError = false;
          this.emptyOtpField();
        }, 1500);
      }
      if (responseBody.code === '705') {
        this.isInput = false;
        this.emptyOtpField();
      }
    }
  }

  // Empty OTP Field when OTP request resend
  emptyOtpField() {
    for (let i = 0; i < 6; i++) {
      const index = i + 1;
      this['otp' + index] = null;
    }
    this.f1.readonly = false;
    this.f1.setFocus();
  }

  dismiss(resp?: any) {
    this.modalCtrl.dismiss(resp);
  }
}
