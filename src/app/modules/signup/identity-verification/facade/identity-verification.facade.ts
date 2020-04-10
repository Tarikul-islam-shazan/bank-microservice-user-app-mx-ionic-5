/**
 * Facade: Identity Verification Facade
 * Details: User identity verification when user used SSN Number start with 83...89 for Registration.
 * Date: February 11,2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 * Include Ticket ID:GMA-4146:Signup: Handling error in KYC page.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { SignUpService } from '@app/core/services/sign-up-service.service';
import { IdentityQuestion, IdentityAnswer } from '@app/core/models/dto/signup';
@Injectable()
export class IdentityVerificationFacade {
  answerdQestions: IdentityAnswer[] = [];

  constructor(private signUpService: SignUpService, private router: Router, private analytics: AnalyticsService) {}

  /**
   * Getter of Identity questions form Signup service.
   * @memberof IdentityVerificationFacade
   */
  get identityQuestions(): IdentityQuestion[] {
    return this.signUpService.identityQuestions;
  }

  /**
   * Issue:GMA-4779
   * Date: April 02,2020
   * Developer: Md.Kausar <md.kausar@brainstation23.com>
   * Get the answer id of radio that will be checked
   * @memberof IdentityVerificationFacade
   */
  getAnsweredId(questionId: string): string {
    const index = this.answerdQestions.findIndex(iAnswer => iAnswer.questionId === questionId);
    if (index > -1) {
      return this.answerdQestions[index].answerId;
    } else {
      return '';
    }
  }
  /**
   * Submiting Identity questions to bank.
   * @memberof IdentityVerificationFacade]
   */
  submitAnswer(identityAnswers: IdentityAnswer): void {
    this.signUpService.verifyIdentityAnswers(identityAnswers).subscribe(resp => {
      if (resp.customerId) {
        // GMA-4688 Md.Kausar - calling the function clearQuestionAnswer() to clear question answer array
        this.clearQuestionAnswer();
        this.analytics.logEvent(AnalyticsEventTypes.VerifyIndentityQuestionnaireEnd);
        this.router.navigate(['/signup/terms-conditions']);
        this.signUpService.identityQuestions = [];
      }
      if (resp.questions) {
        this.signUpService.identityQuestions = resp.questions;
        // GMA-4688 Md.Kausar - calling the function clearQuestionAnswer() to clear question answer array
        this.clearQuestionAnswer();
      }
    });
  }

  /**
   * Setting the identity question.
   * @memberof IdentityVerificationFacade]
   */
  setIdentityQuestions(): void {
    this.signUpService.getIdentitQuestions().subscribe(
      res => {
        if (!this.identityQuestions && this.identityQuestions.length === 0) {
          this.router.navigate(['/login-user']);
        } else {
          this.analytics.logEvent(AnalyticsEventTypes.VerifyIndentityQuestionnaireStated);
        }
      },
      err => {
        this.router.navigate(['/login-user']);
      }
    );
  }

  /**
   * Adding or updating question answered list.
   * @memberof IdentityVerificationFacade]
   */
  setAnswer(identityAnswer: IdentityAnswer): void {
    const index = this.answerdQestions.findIndex(iAnswer => iAnswer.questionId === identityAnswer.questionId);
    if (index > -1) {
      this.answerdQestions[index] = identityAnswer;
    } else {
      this.answerdQestions.push(identityAnswer);
    }
  }
  /**
   * GMA-4688 Md.Kausar - Set question answer to empty array
   * A functiion to set IdentityAnswer empty array
   * @memberof IdentityVerificationFacade
   */
  clearQuestionAnswer(): void {
    this.answerdQestions = [];
  }
}
