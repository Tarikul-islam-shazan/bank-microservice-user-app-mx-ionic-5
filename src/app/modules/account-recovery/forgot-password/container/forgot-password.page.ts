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
import { SignupValidators, IChallengeAnswers } from '@app/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'mbc-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss']
})
export class ForgotPasswordPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  usernameForm: FormGroup;
  quesForm: FormGroup;
  constructor(public facade: ForgotPasswordFacade, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  ionViewDidLeave() {
    this.facade.isSecurityQuesVisible = false;
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
      answerOne: [null, Validators.required],
      answerTwo: [null, Validators.required]
    });
  }

  continueForgotPassword() {
    this.facade.requestOtpCode(this.usernameForm.value.username);
  }

  /**
   * Issue:  GMA-4450
   * Details:  Forgot Password: Implement calendar in Date of Birth field.
   * Date: March 06, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */
  continueSecurityQuestion() {
    let date = this.quesForm.value.answerOne;
    date = date.split('T');
    const answer: IChallengeAnswers = {
      username: this.usernameForm.value.username,
      key: this.facade.challengeQues.key,
      answers: [
        {
          id: this.facade.challengeQues.questions[0].id,
          answer: date[0]
        },
        {
          id: this.facade.challengeQues.questions[1].id,
          answer: this.quesForm.value.answerTwo
        }
      ]
    };

    this.facade.validateChallengeQuestions(answer).subscribe(() => {
      this.router.navigate(['/account-recovery/change-password']);
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
