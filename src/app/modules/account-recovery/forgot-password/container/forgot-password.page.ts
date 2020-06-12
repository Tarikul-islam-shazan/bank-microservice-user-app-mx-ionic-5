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
import { IonContent } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'mbc-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss']
})
export class ForgotPasswordPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  usernameForm: FormGroup;
  quesForm: FormGroup;

  constructor(public facade: ForgotPasswordFacade, private formBuilder: FormBuilder) {}

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
      this.facade.openSuccessModal();
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
}
