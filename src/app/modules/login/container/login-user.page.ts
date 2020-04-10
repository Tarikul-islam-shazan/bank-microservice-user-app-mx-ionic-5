import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginFacade } from '../facade/login-facade';
import { Logger, SignupValidators } from '@app/core';

const log = new Logger('LoginUserPage');
@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.page.html',
  styleUrls: ['./login-user.page.scss']
})
export class LoginUserPage implements OnInit {
  loginForm: FormGroup;
  isPasswordVisible: boolean;
  isSignUpAvailable = false;

  constructor(
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public loginFacade: LoginFacade
  ) {}

  ngOnInit() {
    this.initLoginForm();
  }

  /**
   * @initializes login form
   *
   * @private
   * @returns {void}
   * @memberOf LoginUserPage
   */
  private initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      username: [
        this.loginFacade.username,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
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
      rememberUsername: [this.loginFacade.username ? true : false],
      rememberBiometric: [this.loginFacade.useBiometric ? true : false]
    });
  }

  ionViewWillEnter() {
    this.isPasswordVisible = false;
    this.isSignUpAvailable = !this.loginFacade.checkSignUpFeatureAvailableForUser();
  }

  async ionViewDidEnter() {
    /**
     * Issue: GMA-4481: Login screen: When users select "Save username" checkbox it saves both the username and password.
     * Date: March 05, 2020
     * Developer: M G Muntaqeem <muntaqeem@bs-23.net>
     * When the user logs out, the password remains because the form is not reinitialized, that's why update the value to null
     */
    this.loginForm.controls.password.patchValue(null);
    // sets the status of biometric in the from control
    const biometric = this.loginFacade.useBiometric ? true : false;
    this.loginForm.controls.rememberBiometric.setValue(biometric);
    const isLoggedOut = await this.loginFacade.isLoggedOut();
    if (isLoggedOut && this.loginFacade.useBiometric) {
      this.loginFacade.requestBiometricAuthentication(this.loginForm.value);
    }
  }

  /**
   * @summary authenticates username password to login
   *
   * @returns {void}
   * @memberOf LoginUserPage
   */
  doLogin(): void {
    if (this.loginForm.valid) {
      this.loginFacade.authenticate(this.loginForm.value);
    }
  }

  /**
   * @summary navigates to signup email page
   *
   * @returns {void}
   * @memberOf LoginUserPage
   */
  gotoSignupEmail(): void {
    this.loginFacade.navigateToRoute('/signup/email');
  }

  /**
   * @summary changes password fields input type
   *
   * @returns {void}
   * @memberOf LoginUserPage
   */
  passwordShowHide(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
