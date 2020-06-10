import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { REG_EX_PATTERNS, SignupValidators } from '@app/core';
import { SignupCreateLoginFacade } from '../facade';
import { ModalService } from '@app/shared';

@Component({
  selector: 'app-create-login',
  templateUrl: './create-login.page.html',
  styleUrls: ['./create-login.page.scss']
})
export class CreateLoginPage implements OnInit {
  createLoginForm: FormGroup;
  isPasswordVisible = false;
  isRepeatPasswordVisible = false;
  regExPattern = null;
  constructor(
    private formBuilder: FormBuilder,
    private facade: SignupCreateLoginFacade,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.regExPattern = REG_EX_PATTERNS;
    this.initCreateLoginForm();
  }

  initCreateLoginForm(): void {
    this.createLoginForm = this.formBuilder.group({
      username: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          SignupValidators.allowedUsernameCharacters
        ]
      ],
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
          Validators.pattern(this.regExPattern.PASSWORD),
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
  showUsernameHint() {
    this.modalService.openInfoModalComponent(this.getUsernameTipModalCompProps()); // This modal will show username info.
  }

  getUsernameTipModalCompProps() {
    const modalComponentContent = {
      componentProps: {
        contents: [
          {
            title: 'signup-module.create-login-page.login-form.username-tip-modal-title',
            details: ['signup-module.create-login-page.login-form.username-tip-modal-details']
          }
        ]
      }
    };
    return modalComponentContent;
  }

  isPasswordMatch(): boolean {
    return (
      this.createLoginForm.controls.password.value === this.createLoginForm.controls.repeatPassword.value &&
      this.createLoginForm.controls.repeatPassword.valid
    );
  }

  continue() {
    const username: string = this.createLoginForm.value.username;
    const password: string = this.createLoginForm.value.password;
    if (this.createLoginForm.valid && this.isPasswordMatch()) {
      this.facade.createLogin({ username$: username.toLowerCase(), password$: password });
    }
  }
}
