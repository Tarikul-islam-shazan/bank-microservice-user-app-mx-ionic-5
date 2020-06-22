import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotUsernameFacade } from '../facade';
import { REG_EX_PATTERNS } from '@app/core';

@Component({
  selector: 'mbc-forgot-username',
  templateUrl: './forgot-username.page.html',
  styleUrls: ['./forgot-username.page.scss']
})
export class ForgotUsernamePage implements OnInit {
  usernameForm: FormGroup;
  regExPattern = null;
  constructor(private formBuilder: FormBuilder, private facade: ForgotUsernameFacade) {
    this.regExPattern = REG_EX_PATTERNS;
  }

  ngOnInit() {
    this.initForm();
  }

  /**
   * GMA-4664
   * @description form validateion check
   * @memberof ForgotUsernamePage
   * @author Sudipta Ghosh<sudipta.ghosh@bs-23.net>
   */
  initForm() {
    this.usernameForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
          Validators.pattern(this.regExPattern.EMAIL)
        ])
      ]
    });
  }

  continue() {
    this.facade.forgotUsername(this.usernameForm.value.email.toLowerCase());
  }
}
