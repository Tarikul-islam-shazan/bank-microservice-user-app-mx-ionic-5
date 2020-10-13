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
        '',
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
      rememberUsername: [false],
      rememberBiometric: [false]
    });
    this.updateLoginFormValue();
  }

  ionViewWillEnter() {
    this.isPasswordVisible = false;
    this.isSignUpAvailable = !this.loginFacade.checkSignUpFeatureAvailableForUser();
  }

  /**
   * Ticket:MM2-334
   * Details: Login Screen : Save username checkbox is non-functional
   * Date: June 04, 2020
   * Developer: Kausar <md.kausar@brainstation23.com>
   * @summary A function to update value of login form as required
   * @memberof LoginUserPage
   */
  updateLoginFormValue(): void {
    const rememberUsername = this.loginFacade.rememberUsername;
    const password = null;
    const username = rememberUsername ? this.loginFacade.username : '';
    const rememberBiometric = this.loginFacade.useBiometric ? true : false;
    this.loginForm.patchValue({ rememberUsername, username, password, rememberBiometric });
  }

  async ionViewDidEnter() {
    this.updateLoginFormValue();
    await this.loginFacade.isLoggedOut();
    this.loginFacade.clearUserCashData();
    if (this.loginFacade.useBiometric) {
      await this.loginFacade.requestBiometricAuthentication(this.loginForm.value);
    }

    this.loginFacade.getBankConatactNumber();
  }

  /**
   * @summary authenticates username password to login
   *
   * @returns {void}
   * @memberOf LoginUserPage
   */
  async doLogin(): Promise<void> {
    if (this.loginForm.valid) {
      const { username, password, rememberBiometric, rememberUsername } = this.loginForm.value;
      await this.loginFacade.requestForAuthentication({
        username,
        password,
        rememberBiometric,
        rememberUsername
      });
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
