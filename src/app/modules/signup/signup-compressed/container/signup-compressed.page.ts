import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REG_EX_PATTERNS, SignupValidators } from '@app/core';
import { SignupCompressedFacade } from '../facade';

@Component({
  selector: 'app-signup-compressed',
  templateUrl: './signup-compressed.page.html',
  styleUrls: ['./signup-compressed.page.scss']
})
export class SignupCompressedPage implements OnInit {
  isInviterEmailReadOnly = false;
  nickNameMaxLength = 15;
  signupCompressedForm: FormGroup;

  /**
   * Details: Getter function - It will return remaining character length of nickname
   *
   * @memberof SignupCompressedPage
   */
  get nickNameCharacterCount(): number {
    const value = this.signupCompressedForm.controls.nickname.value.length;
    return this.nickNameMaxLength - (value <= this.nickNameMaxLength && value >= 0 ? value : 0);
  }

  constructor(private facade: SignupCompressedFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initSignupCompressedForm();
    this.facade.getCountries();
  }

  /**
   * @summary initialze form
   *
   * @private
   * @returns {void}
   * @memberOf SignupCompressedPage
   */
  private initSignupCompressedForm(): void {
    this.signupCompressedForm = this.formBuilder.group(
      {
        country: ['', Validators.required],
        inviterEmailOrCode: [''],
        inviterFoundOwn: [false],
        nickname: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(this.nickNameMaxLength)]]
      },
      {
        validators: SignupValidators.conditionallyCheckIfRequired(
          'inviterFoundOwn',
          'inviterEmailOrCode',
          Validators.pattern(REG_EX_PATTERNS.INVITER_EMAIL_OR_CODE)
        )
      }
    );
  }

  /**
   * @summary opens inviter info modal
   *
   * @returns {void}
   * @memberOf SignupCompressedPage
   */
  inviterEmailClick(): void {
    if (this.isInviterEmailReadOnly === true) {
      this.facade.openInviterCheckInfoModal();
    }
  }

  /**
   * @summary change checkbox value
   *
   * @returns {void}
   * @memberOf SignupCompressedPage
   */
  changeCheckboxValue(): void {
    this.isInviterEmailReadOnly = !this.isInviterEmailReadOnly;
  }

  /**
   * @summary opens country modal
   *
   * @returns {void}
   * @memberOf SignupCompressedPage
   */
  openCountryModal(): void {
    this.facade.openCountryModal(() => {
      const { countryName, countryAbv } = this.facade.selectedCountry;
      if (countryAbv === null) {
        this.facade.openUnavailableCountryModal();
      }
      this.signupCompressedForm.controls.country.patchValue(countryName);
    });
  }

  /**
   * @summary assign form values
   *
   * @returns {void}
   * @memberOf SignupCompressedPage
   */
  continueSignup(): void {
    if (this.signupCompressedForm.valid) {
      this.facade.assignFormValues(this.signupCompressedForm.value);
    }
  }

  continueButtonShouldBeDisabled() {
    return this.signupCompressedForm.invalid || this.signupCompressedForm.controls.country.value === 'Others';
  }
}
