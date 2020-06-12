/**
 * * Issue: GMA- 4724
 * * Issue Details: Forgot Password folder structure refactor.
 * * Developer Feedback: Issue solved
 * Date: March 27, 2020
 * Developer: Zahidul Islam <zahidul@bs-23.net>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { ForgotPasswordFacade } from '../facade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignupValidators, ITemporaryPasswordRequest } from '@app/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import * as moment from 'moment';
import { IMeedModalContent, ModalService, SuccessModalPage } from '@app/shared';

@Component({
  selector: 'mbc-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss']
})
export class ForgotPasswordPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  usernameForm: FormGroup;
  quesForm: FormGroup;

  constructor(
    public facade: ForgotPasswordFacade,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  ionViewDidLeave() {
    this.facade.isSecurityQuesVisible = false;
    this.facade.isUsernameAssigned = false;
  }

  initForm() {
    this.usernameForm = this.formBuilder.group({
      username: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          SignupValidators.allowedUsernameCharacters
        ]
      ]
    });

    this.quesForm = this.formBuilder.group({
      dateOfBirth: ['', Validators.required],
      debitCardNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(19)]]
    });
  }

  continueForgotPassword() {
    this.facade.isUsernameAssigned = true;
  }

  continueSecurityQuestion() {
    const answer: ITemporaryPasswordRequest = {
      username: this.usernameForm.value.username,
      debitCardNumber: this.quesForm.value.debitCardNumber,
      dateOfBirth: moment(this.quesForm.value.dateOfBirth).format('MM/DD/YYYY')
    };

    this.facade.requestTemporaryPassword(answer).subscribe(() => {
      this.openSuccessModal();
    });
  }

  /**
   * Issue: GMA-4359
   * Details: Forgot Password: Need to implement date format and SSN format in input field.
   * Also scrolled up the conent so that input box is blocked by the keyboard and remain visible to the user
   * Date: February 11, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */
  onFocus(): void {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 500);
  }

  private openSuccessModal(): void {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'login-module.forgot-password-page.success-modal.temporary-password-email'
        }
      ],
      actionButtons: [
        {
          text: 'login-module.forgot-password-page.success-modal.continue-button',
          cssClass: 'white-button',
          handler: async () => {
            this.modalService.close();
          }
        }
      ],
      onDidDismiss: async () => {
        this.router.navigate(['/account-recovery/recover-password']);
      }
    };

    this.modalService.openModal(SuccessModalPage, componentProps);
  }
}
