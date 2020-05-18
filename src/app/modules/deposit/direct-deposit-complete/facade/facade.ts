import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService } from '@app/core';

@Injectable()
export class DirectDepositCompleteFacaed {
  constructor(private router: Router, private signUpService: SignUpService) {}

  /**
   * Issue:  GMA-4828
   * Details:  Direct Deposit: Unexpected behavior when going to direct
   *  deposit right after completing signup.
   * Date: April 06, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */

  /**
   * as this is a shared module between the signup and after the signup, this
   * function checks from where the user has come from and redirects the user
   * accordingly
   *
   * @memberof DirectDepositCompleteFacaed
   */
  exploreApp() {
    const directDepositFlow = this.signUpService.fundingInfo;
    if (directDepositFlow) {
      this.router.navigate(['/login-user']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
