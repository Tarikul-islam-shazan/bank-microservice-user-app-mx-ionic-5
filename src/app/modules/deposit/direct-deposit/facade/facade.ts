import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SignUpService, DepositFund, AccountType, AccountService } from '@app/core';
import { MemberService } from '@app/core/services/member.service';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { ModalService } from '@app/shared';
import { DirectDepositInfoModalComponent } from '../component/direct-deposit-info-modal/direct-deposit-info-modal.component';
@Injectable()
export class DirectDepositFacade {
  constructor(
    private router: Router,
    private signupService: SignUpService,
    private memberService: MemberService,
    private accountService: AccountService,
    private readonly analyticsService: AnalyticsService,
    private modalService: ModalService
  ) {}

  fundDeposit(_businessName: string) {
    const depositFund = this.getDepositFund(_businessName);
    this.signupService.fundDeposit(depositFund).subscribe(() => {
      this.analyticsService.logEvent(AnalyticsEventTypes.DirectDepositEmailed, { employer: _businessName });
      this.router.navigate(['/signup/deposit/direct-deposit-complete']);
    });
  }

  getDepositFund(_businessName: string): DepositFund {
    let depositFund: DepositFund;
    const isFromSignUp = this.signupService.fundingInfo ? true : false;
    if (isFromSignUp) {
      depositFund = {
        email: this.signupService.member.email,
        accountNumber: this.signupService.fundingInfo.accountNumber,
        bankRoutingNumber: this.signupService.fundingInfo.interbankClabe,
        businessName: _businessName
      };
    } else {
      const account = this.accountService.getCachedAccountSummary().filter(ac => {
        return ac.accountType === AccountType.DDA;
      })[0];
      depositFund = {
        email: this.memberService.member.email,
        accountNumber: account.accountNumber,
        bankRoutingNumber: account.routingNumber,
        businessName: _businessName
      };
    }
    return depositFund;
  }

  /**
   * Fix: GMA-4715
   *  Direct Deposit Modal implemented for question mark.
   */
  openInfoModal() {
    this.modalService.openModal(DirectDepositInfoModalComponent);
  }
}
