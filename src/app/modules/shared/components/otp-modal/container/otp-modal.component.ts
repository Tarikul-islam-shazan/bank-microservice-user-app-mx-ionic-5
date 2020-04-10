import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, IonContent, ModalController } from '@ionic/angular';
import { OtpModalFacade } from '../facade';

@Component({
  selector: 'mbc-otp-modal',
  templateUrl: './otp-modal.component.html',
  styleUrls: ['./otp-modal.component.scss']
})
export class OtpModalComponent implements OnInit {
  @ViewChild('hiddenInput', { static: false }) hiddenInput: IonInput;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  code = [];
  dots = ['·', '·', '·', '·', '·', '·'];
  codeError = false;
  scrolldown = false;
  isInput = true;

  constructor(private modalCtrl: ModalController, private facade: OtpModalFacade) {}

  ngOnInit() {}

  ionViewWillEnter() {}

  validateInputCode(event: any) {
    if (this.isValidInputCode(event)) {
      this.verifyEmailCode();
    }
  }

  isValidInputCode(event: any): boolean {
    if (event.keyCode === 8) {
      if (this.codeError) {
        setTimeout(() => {
          this.content.scrollToBottom();
        }, 500);
      }
      this.codeError = false;
      if (this.code.length >= 1) {
        this.code.pop();
      }
    } else {
      if (this.code.length <= 5) {
        if (event.key >= '0' && event.key <= '9') {
          this.code.push(event.key);
        }
      }
    }
    if (this.code.length === 6 && !this.codeError) {
      return true;
    }
    return false;
  }

  setFocus() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 500);
    this.hiddenInput.setFocus();
  }

  resend() {
    this.isInput = true;
    this.code = [];
  }

  verifyEmailCode() {
    const code = this.code.join('');
    this.facade.verifyOtp(code).subscribe(resp => {
      this.validateOtpVerificationResponse(resp);
    });
  }

  validateOtpVerificationResponse(resp: any) {
    if (resp && !resp.status) {
      setTimeout(() => {
        this.dismiss(resp);
      }, 50);
    }
    if (resp && resp.status === 403) {
      const responseBody = resp.error.data;
      if (responseBody.code === '704') {
        this.codeError = true;
        setTimeout(() => {
          this.codeError = false;
          this.code = [];
        }, 1500);
      }
      if (responseBody.code === '705') {
        this.isInput = false;
      }
    }
  }

  dismiss(resp?: any) {
    this.modalCtrl.dismiss(resp);
  }
}
