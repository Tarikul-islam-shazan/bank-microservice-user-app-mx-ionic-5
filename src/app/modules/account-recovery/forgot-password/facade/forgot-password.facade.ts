import { AccountRecoveryService } from '@app/core/services/account-recovery.service';
import { IChallengeAnswers, IChallengeQuestions, SettingsService } from '@app/core';
import { Injectable } from '@angular/core';
import { ModalService } from '@app/shared';
import { noop, Observable } from 'rxjs';
import { UserSettings } from '@app/core/models/app-settings';

@Injectable()
export class ForgotPasswordFacade {
  private username: string;
  isSecurityQuesVisible = false;
  challengeQues: IChallengeQuestions;
  constructor(
    private accountRecoveryService: AccountRecoveryService,
    private modalService: ModalService,
    private settingsService: SettingsService
  ) {}

  /**
   * @summary Request for OTP Code;
   *
   * @param {string} username
   * @returns {void}
   * @memberof ForgotPasswordFacade
   */
  requestOtpCode(username: string): void {
    this.username = username;
    this.accountRecoveryService.getChallengeQuestions(username).subscribe(noop, err => {
      if (err.status === 403) {
        const bankIdentifier = err.headers.get('MeedBankingClub-Bank-Identifier');
        if (bankIdentifier) {
          const userSettings: UserSettings = { bankIdentifier };
          this.settingsService.setUserSettings(userSettings);
        }
        this.modalService.openOtpModal((dismissResp: any) => {
          const { data } = dismissResp;
          if (data) {
            // set challenge question(Security Question)
            this.challengeQues = data;
            // Set Security Question visibility;
            this.isSecurityQuesVisible = true;
          }
        });
      }
    });
  }

  /**
   * @summary Validate Forgot Password Challenge Question
   *
   * @param {IChallengeAnswers} answer
   * @returns {Observable<IChallengeAnswers>}
   * @memberof ForgotPasswordFacade
   */

  validateChallengeQuestions(answer: IChallengeAnswers): Observable<IChallengeAnswers> {
    return this.accountRecoveryService.validateChallengeQuestions(answer);
  }
}
