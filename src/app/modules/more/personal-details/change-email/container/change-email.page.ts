import { ChangeEmailFacade } from '../facade';
import { CommonValidators, ICustomer } from '@app/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'change-email',
  templateUrl: './change-email.page.html',
  styleUrls: ['./change-email.page.scss']
})
export class ChangeEmailPage implements OnInit {
  changeEmailForm: FormGroup;
  customer: ICustomer = {};

  constructor(private facade: ChangeEmailFacade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getCustomer();
    this.initChangeEmailForm();
  }

  /**
   * @summary gets customer information
   *
   * @private
   * @returns {void}
   * @memberOf ChangeEmailPage
   */
  private getCustomer(): void {
    this.customer = this.facade.customer;
  }

  /**
   * @summary initializes the form
   *
   * @private
   * @returns {void}
   * @memberOf ChangeEmailPage
   */
  private initChangeEmailForm(): void {
    this.changeEmailForm = this.formBuilder.group(
      {
        currentEmail: [{ value: this.customer.email, disabled: true }, [Validators.required, Validators.email]],
        newEmail: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email]]
      },
      {
        validator: CommonValidators.compareTwoFields('newEmail', 'confirmEmail')
      }
    );
  }

  /**
   * @summary closes the modal
   *
   *
   * @memberOf ChangeEmailPage
   */
  dismiss(): void {
    this.facade.dismissModal();
  }

  /**
   * @summary opens the otp modal on success
   *
   * @returns {void}
   * @memberOf ChangeEmailPage
   */
  save(): void {
    if (this.changeEmailForm.valid) {
      const { confirmEmail } = this.changeEmailForm.value;
      this.facade.save(confirmEmail);
    }
  }
}
