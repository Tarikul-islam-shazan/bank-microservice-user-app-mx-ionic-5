import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REG_EX_PATTERNS, SignupValidators } from '@app/core';
import { SignupCompressedFacade } from '../facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup-compressed',
  templateUrl: './signup-compressed.page.html',
  styleUrls: ['./signup-compressed.page.scss']
})
export class SignupCompressedPage implements OnDestroy, OnInit {
  signupNicknameForm: FormGroup;
  nickNameMaxLength = 15;

  isInviterEmailReadOnly = false;

  singUpFromSubscription: Subscription;

  /**
   * Details: Getter function - It will return remaining character length of nickname
   *
   * @memberof ChangeNicknamePage
   */
  get nickNameCharacterCount(): number {
    const value = this.signupNicknameForm.controls.nickname.value.length;
    return this.nickNameMaxLength - (value <= this.nickNameMaxLength && value >= 0 ? value : 0);
  }

  constructor(private facade: SignupCompressedFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initSignupNicknameForm();
    this.facade.getCountries();
  }

  /**
   * @summary initialze form
   *
   * @private
   * @returns {void}
   * @memberOf SignupNicknamePage
   */
  private initSignupNicknameForm(): void {
    this.signupNicknameForm = this.formBuilder.group(
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
   * @memberOf SignupNicknamePage
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
   * @memberOf SignupNicknamePage
   */
  changeCheckboxValue(): void {
    this.isInviterEmailReadOnly = !this.isInviterEmailReadOnly;
  }

  /**
   * @summary opens country modal
   *
   * @returns {void}
   * @memberOf SignupNicknamePage
   */
  openCountryModal(): void {
    this.facade.openCountryModal(() => {
      const { countryName, countryAbv } = this.facade.selectedCountry;
      if (countryAbv === null) {
        this.facade.openUnavailableCountryModal();
      } else {
        this.signupNicknameForm.controls.country.patchValue(countryName);
      }
    });
  }

  /**
   * @summary assign form values
   *
   * @returns {void}
   * @memberOf SignupNicknamePage
   */
  continueSignup(): void {
    if (this.signupNicknameForm.valid) {
      this.facade.assignFormValues(this.signupNicknameForm.value);
    }
  }

  ngOnDestroy(): void {
    if (this.singUpFromSubscription) {
      this.singUpFromSubscription.unsubscribe();
    }
  }
}
