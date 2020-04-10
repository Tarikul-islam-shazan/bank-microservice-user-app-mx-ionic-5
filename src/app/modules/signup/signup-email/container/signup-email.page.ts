import { Logger, REG_EX_PATTERNS } from '@app/core';
import { SignupEmailFacade } from '../facade/';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const log = new Logger('SignupEmailPage');
/*
 * Ticket: GMA-4451
 * Problem: Signup: "unknown" error showing.
 * Details: remove unused code import from here
 * Date: February 19, 2020
 * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
 */

@Component({
  selector: 'app-signup-email',
  templateUrl: './signup-email.page.html',
  styleUrls: ['./signup-email.page.scss']
})
export class SignupEmailPage implements OnInit {
  signupEmailForm: FormGroup;
  regExPattern = null;
  constructor(private formBuilder: FormBuilder, private facade: SignupEmailFacade) {
    this.regExPattern = REG_EX_PATTERNS;
  }

  ngOnInit() {
    this.initSignupEmail();
  }

  initSignupEmail() {
    this.signupEmailForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern(this.regExPattern.EMAIL)
        ])
      ]
    });
  }

  continueSignup(formValues: any) {
    const email: string = formValues.email;
    this.facade.registerEmail(email.toLowerCase());
  }
}
