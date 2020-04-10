import { Component, ViewChild } from '@angular/core';
import { IonContent, IonInput } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { SignupEmailVerificationFacade } from '../facade';
import { Router } from '@angular/router';
import { ModalService, IMeedModalContent } from '@app/shared';
import { IinputOption, InputFormatType } from '@app/shared/directives/mask-input.directive';

/**
 * * Issue: GMA-4423
 * * Details: Email verification page> After incorrect entry of verification code the input field is not cleared
 * * Developer: Zahidul Islam<zahidul@bs-23.net>
 * Date: Feb 13, 2020
 * @export
 * @class VerificationPage
 */
@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss']
})
export class VerificationPage {
  @ViewChild('hiddenInput', { static: false }) hiddenInput: IonInput;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  codeError = false;
  scrolldown = false;
  isInput = true;
  emailVerification: IinputOption;
  verificationCode: string;
  codeRegex = /^-?([0-9]\d*)?$/;

  constructor(
    private modalService: ModalService,
    public translateService: TranslateService,
    private facade: SignupEmailVerificationFacade,
    private router: Router
  ) {
    this.emailVerification = {
      type: InputFormatType.EMAIL_VERIFICATION
    };
  }

  ionViewWillEnter() {
    this.createEmailVerificationCode();
  }

  trackVerificationCodeChange() {
    if (this.checkVerificationCodeValid()) {
      this.verifyEmailCode();
    }
  }

  checkVerificationCodeValid() {
    if (this.verificationCode.length === 6 && this.codeRegex.test(this.verificationCode)) {
      return true;
    }
    return false;
  }

  setFocus() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1500);
    this.hiddenInput.setFocus();
  }

  resend() {
    this.isInput = true;
    this.verificationCode = '';
    this.createEmailVerificationCode();
  }

  async openInfo() {
    this.translateService
      .get(['signup-module.verification-page.modal-title', 'signup-module.verification-page.modal-description'])
      .subscribe(async transRes => {
        const componentProps: IMeedModalContent = {
          contents: [
            {
              title: transRes['signup-module.verification-page.modal-title'],
              details: [transRes['signup-module.verification-page.modal-description']]
            }
          ]
        };
        await this.modalService.openInfoModalComponent({ componentProps });
      });
  }

  createEmailVerificationCode() {
    this.facade.createEmailVerificationCode();
  }

  verifyEmailCode() {
    this.facade.verifyEmailCode(this.verificationCode).subscribe(
      resp => {
        if (resp.isValid) {
          this.facade.emailVerificationSuccess();
        } else {
          this.codeError = true;
          // by setTimeout shaking animation will disappear after 1sec and input will empty
          setTimeout(() => {
            this.codeError = false;
            this.verificationCode = '';
          }, 1500);
        }
      },
      err => {
        this.isInput = false;
        this.facade.logAnalyticsForWrongCodeError();
      }
    );
  }
}
