/**
 * Container: Identity Verification Page
 * Details: User identity verification when user used SSN Number start with 83...89 for Registration.
 * Date: February 11,2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 * Include Ticket ID:GMA-4146:Signup: Handling error in KYC page.
 */

import { Component, OnInit } from '@angular/core';
import { IdentityVerificationFacade as Facade } from '@app/signup/identity-verification/facade/identity-verification.facade';
import { IdentityAnswer } from '@app/core/models/dto/signup';

@Component({
  selector: 'app-identity-verification',
  templateUrl: './identity-verification.page.html',
  styleUrls: ['./identity-verification.page.scss']
})
export class IdentityVerificationPage implements OnInit {
  constructor(public facade: Facade) {}

  ngOnInit() {
    if (!this.facade.identityQuestions) {
      this.facade.setIdentityQuestions();
    }
  }

  ionViewWillLeave(): void {
    this.facade.clearQuestionAnswer();
  }

  identityQuestionAnswerd(event: CustomEvent, questionId: string): void {
    const identityAnswer: IdentityAnswer = { questionId, answerId: event.detail.value };
    this.facade.setAnswer(identityAnswer);
  }
}
