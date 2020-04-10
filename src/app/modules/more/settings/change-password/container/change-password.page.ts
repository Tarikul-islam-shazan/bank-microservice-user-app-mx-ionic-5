/**
 * Container: Change Password page
 * Details: More Menu>Settings>Change Password: Implementing Change Password Functionality.
 * Date: 25 March,2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 * Include Ticket ID:GMA-4749
 */
import { ChangePasswordFacade } from '@app/more/settings/change-password/facade';
import { CommonValidators } from '@app/core/util/common-validators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REG_EX_PATTERNS } from '@app/core/models/patterns';
import { SignupValidators } from '@app/core/util/signup-validators';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss']
})
export class ChangePasswordPage implements OnInit {
  changePasswordForm: FormGroup;

  isCurrentPasswordVisible: boolean;
  isPasswordVisible: boolean;
  isRepeatPasswordVisible: boolean;

  constructor(private facade: ChangePasswordFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initChangePasswordForm();
  }

  /**
   * @summary constructs validators for password fields
   *
   * @private
   * @returns {Validators}
   * @memberOf ChangePasswordPage
   */
  private passwordValidators(): Validators {
    return [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
      Validators.pattern(REG_EX_PATTERNS.PASSWORD),
      SignupValidators.allowedPasswordSpecialChars,
      SignupValidators.oneLowerCase,
      SignupValidators.oneUpperCase,
      SignupValidators.oneNumber
    ];
  }

  /**
   * @summary initializes for
   *
   * @private
   * @returns {void}
   * @memberOf ChangePasswordPage
   */
  private initChangePasswordForm(): void {
    this.changePasswordForm = this.formBuilder.group(
      {
        currentPassword: [null, [Validators.required, Validators.maxLength(30)]],
        password: [null, this.passwordValidators()],
        repeatPassword: [null, this.passwordValidators()]
      },
      {
        validator: CommonValidators.compareTwoFields('password', 'repeatPassword')
      }
    );
  }

  /**
   * @summary Toogle RepeatPassword type Text Or Passowrd
   *
   * @returns {void}
   * @memberOf ChangePasswordPage
   */
  changeInputTypeVisibility(inputField: string): void {
    this[inputField] = !this[inputField];
  }

  /**
   * @summary Calling change password facade function with changePasswordForm value
   *
   * @returns {void}
   * @memberOf ChangePasswordPage
   */
  changePassword(): void {
    if (this.changePasswordForm.valid) {
      const { currentPassword, repeatPassword: newPassword } = this.changePasswordForm.value;
      this.facade.changePassword({ currentPassword, newPassword });
    }
  }
}
