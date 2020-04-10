import { ChangeNicknameFacade } from '../facade';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isEqual } from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'change-nickname',
  templateUrl: './change-nickname.page.html',
  styleUrls: ['./change-nickname.page.scss']
})
export class ChangeNicknamePage implements OnInit, OnDestroy {
  changeNicknameForm: FormGroup;
  nickNameMaxLength = 15;
  isFormValueChanged = false;

  nicknameFromSubscription: Subscription;

  constructor(private facade: ChangeNicknameFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initChangeNicknameForm();
    this.checkIfFormValueChanged();
  }

  /**
   *
   *
   * @private
   * @returns {void}
   * @memberOf ChangeNicknamePage
   */
  private initChangeNicknameForm(): void {
    this.changeNicknameForm = this.formBuilder.group({
      nickname: [
        this.facade.customer.nickname,
        [Validators.required, Validators.minLength(1), Validators.maxLength(this.nickNameMaxLength)]
      ]
    });
  }

  /**
   * @summary checks if form values have been changed or not
   *
   * @private
   * @returns {void}
   * @memberOf ChangeNicknamePage
   */
  private checkIfFormValueChanged(): void {
    this.nicknameFromSubscription = this.changeNicknameForm.valueChanges.subscribe((changedFormValue: FormData) => {
      this.isFormValueChanged = !isEqual({ nickname: this.facade.customer.nickname }, changedFormValue);
    });
  }

  /**
   * Details: Getter function - It will return remaining character length of nickname
   *
   * @memberof ChangeNicknamePage
   */
  get nickNameCharacterCount(): number {
    const value = this.changeNicknameForm.controls.nickname.value.length;
    return this.nickNameMaxLength - (value <= this.nickNameMaxLength && value >= 0 ? value : 0);
  }

  /**
   * @summary closes the modal
   *
   * @returns {void}
   * @memberOf ChangeNicknamePage
   */
  dismiss(): void {
    this.facade.dismissModal();
  }

  /**
   * @summary updates nickname
   *
   * @returns {void}
   * @memberOf ChangeNicknamePage
   */
  save(): void {
    if (this.changeNicknameForm.valid) {
      const { nickname } = this.changeNicknameForm.value;
      this.facade.updateCustomerNickname(nickname);
    }
  }

  ngOnDestroy(): void {
    if (this.nicknameFromSubscription) {
      this.nicknameFromSubscription.unsubscribe();
    }
  }
}
