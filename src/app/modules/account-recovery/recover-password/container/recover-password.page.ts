import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { REG_EX_PATTERNS, SignupValidators, IRecoverPassword } from '@app/core';
import { RecoverPasswordFacade } from '../facade';
@Component({
  selector: 'mbc-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss']
})
export class RecoverPasswordPage implements OnInit {
  changePasswordForm: FormGroup;
  isTemporaryPasswordVisible: boolean;
  isPasswordVisible: boolean;
  isRepeatPasswordVisible: boolean;
  constructor(private formBuilder: FormBuilder, private facade: RecoverPasswordFacade) {}

  ngOnInit() {
    this.initChangePasswordForm();
  }

  initChangePasswordForm(): void {
    this.changePasswordForm = this.formBuilder.group({
      tempPassword: [null, Validators.required],
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

  showTemporaryPassword() {
    this.isTemporaryPasswordVisible = !this.isTemporaryPasswordVisible;
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

  changePassword(): void {
    const recoverPasswordParams: IRecoverPassword = {
      username: '',
      temporaryPassword: this.changePasswordForm.value.tempPassword,
      newPassword: this.changePasswordForm.value.repeatPassword
    };
    console.log(recoverPasswordParams);

    this.facade.recoverPassword(recoverPasswordParams);
  }
}
