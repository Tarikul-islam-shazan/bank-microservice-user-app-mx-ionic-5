/**
 * Container: ChangePasswordPage
 * Details: Changing user password .
 * Date: February 18, 2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { REG_EX_PATTERNS, SignupValidators } from '@app/core';
import { ChangePasswordFacade } from '../facade';
@Component({
  selector: 'mbc-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss']
})
export class ChangePasswordPage implements OnInit {
  changePasswordForm: FormGroup;
  isPasswordVisible: boolean;
  isRepeatPasswordVisible: boolean;
  constructor(private formBuilder: FormBuilder, private facade: ChangePasswordFacade) {}

  ngOnInit() {
    this.initChangePasswordForm();
  }

  initChangePasswordForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          SignupValidators.allowedPasswordSpecialChars,
          SignupValidators.oneLowerCase,
          SignupValidators.oneUpperCase,
          SignupValidators.oneNumber
        ]
      ],
      repeatPassword: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern(REG_EX_PATTERNS.PASSWORD),
          SignupValidators.allowedPasswordSpecialChars,
          SignupValidators.oneLowerCase,
          SignupValidators.oneUpperCase,
          SignupValidators.oneNumber
        ]
      ]
    });
  }

  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  showRepeatPassword() {
    this.isRepeatPasswordVisible = !this.isRepeatPasswordVisible;
  }

  isPasswordMatch(): boolean {
    return (
      this.changePasswordForm.controls.password.value === this.changePasswordForm.controls.repeatPassword.value &&
      this.changePasswordForm.controls.repeatPassword.valid
    );
  }

  /**
   *  A function used to handled change password request and response using ChangePasswordFacade and showing modal as response.
   *
   *  Issue: GMA-4228
   *  Date: February 28, 2020
   *  Developer: Md.Kausar <md.kausar@brainstation23.com>
   *
   * @memberof ChangePasswordPage
   */
  changePassword() {
    this.facade.resetPassword(this.changePasswordForm.value.repeatPassword).subscribe(resp => {
      this.facade.showResetPasswordSuccessModal();
    });
  }
}
