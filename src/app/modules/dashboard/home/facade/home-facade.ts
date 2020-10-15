import { Injectable } from '@angular/core';
import { IMember } from '@app/core/models/dto/member';
import { Router } from '@angular/router';
import { AccountService } from '@app/core/services/account.service';
import { MemberService } from '@app/core/services/member.service';
import { AccountType, IAccount, BankAccountStatus } from '@app/core/models/dto/account';
import { Logger } from '@app/core/services/logger.service';
import { ModalService, IMeedModalContent } from '@app/shared';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { CardService } from '@app/core/services/card.service';
import { RouteListenerService } from '@app/core';
interface IProgressBar {
  percentage: number;
  amountLists: number[];
}
const logger = new Logger('DashboardFacade');
@Injectable()
export class HomeFacade {
  member: IMember;
  accountSummary: IAccount[] = [];
  availableMeedFlex: number;
  progressBar: IProgressBar = {
    percentage: 0,
    amountLists: []
  };

  constructor(
    private accountService: AccountService,
    private memberService: MemberService,
    private router: Router,
    private modalService: ModalService,
    private analytics: AnalyticsService,
    private cardService: CardService,
    private routerListener: RouteListenerService
  ) {}

  pageTransaction(account: IAccount) {
    switch (account.accountType) {
      case AccountType.DDA:
        this.analytics.logEvent(AnalyticsEventTypes.AccountSelected, { 'account-type': account.accountType });
        this.router.navigate(['/home/checking-history']);
        break;
      case AccountType.LOC:
        this.analytics.logEvent(AnalyticsEventTypes.AccountSelected, { 'account-type': account.accountType });
        this.router.navigate(['/home/loc-history']);
        break;
      case AccountType.SSA:
        this.analytics.logEvent(AnalyticsEventTypes.AccountSelected, { 'account-type': account.accountType });
        this.router.navigate(['/home/savings-transactions']);
        break;
    }
  }

  initialize(): void {
    this.analytics.logEvent(AnalyticsEventTypes.MenuItemSelected, { menu: 'main', option: 'Home' });
    this.member = this.memberService.getCachedMember();
    this.accountSummaryReadDecider();
  }

  getAccountSummary(): IAccount[] {
    return this.accountService.getCachedAccountSummary();
  }

  getCallNumber(): string {
    return this.cardService.supportNumber;
  }

  getReward(): number {
    return this.accountService.getReward();
  }

  goToLoginPage() {
    this.router.navigate(['/login-user']);
  }
  accountSummaryReadDecider() {
    const cashAccountSummary = this.accountService.getCachedAccountSummary();
    if (
      this.routerListener.getPreviousUrl() === '/login-user' &&
      cashAccountSummary &&
      Array.isArray(cashAccountSummary)
    ) {
      this.setAccountSummary();
    } else {
      this.accountService.fetchAccountSummary().subscribe((accountSummary: IAccount[]) => {
        this.setAccountSummary();
      });
    }
  }

  setAccountSummary() {
    const accountSummaryOrder = [AccountType.DDA, AccountType.LOC, AccountType.SSA];
    const cachedAccountSummary = this.accountService.getCachedAccountSummary();
    this.accountSummary = [];
    accountSummaryOrder.forEach(accountType => {
      this.accountSummary.push(
        ...cachedAccountSummary.filter((account: IAccount) => account.accountType === accountType)
      );
    });
    this.setAvailableMeedFlex();
    this.setProgressBar();
  }

  setAvailableMeedFlex() {
    this.availableMeedFlex = this.accountSummary
      .filter((accountData: IAccount) => {
        return accountData.accountType !== AccountType.SSA;
      })
      .reduce((acc, account: IAccount) => {
        return acc + account.availableBalance;
      }, 0);
  }

  setProgressBar() {
    const progressBarFilterList = this.accountSummary
      .filter((accountData: IAccount) => {
        return accountData.accountType !== AccountType.SSA;
      })
      .map((data: IAccount) => {
        return data.availableBalance;
      });
    this.progressBar = {
      percentage: this.calculateBarPercentage(),
      amountLists: progressBarFilterList
    };
  }

  /**
   * Ticket: Fix: GMA-4397
   * Details: Balance bar not showing in proper color.
   * Date: February 13, 2020
   * Developer: Utpaul Sarkar Utpal.Sarker@brainstation23.com
   */

  get checkingAccountAvailableAmount(): number {
    const checkingAccountAvailableAmount = this.accountSummary
      .filter((accountData: IAccount) => {
        return accountData.accountType === AccountType.DDA;
      })
      .map((data: IAccount) => {
        return data.availableBalance;
      })[0];
    return checkingAccountAvailableAmount;
  }

  get lineOfCreditAccountAvailableAmount(): number {
    const lineOfCreditAccountAvailableAmount = this.accountSummary
      .filter((accountData: IAccount) => {
        return accountData.accountType === AccountType.LOC;
      })
      .map((data: IAccount) => {
        return data.availableBalance;
      })[0];
    return lineOfCreditAccountAvailableAmount;
  }

  calculateBarPercentage(): number {
    const checkingAmount = this.checkingAccountAvailableAmount;
    const creditAmount = this.lineOfCreditAccountAvailableAmount;
    if (checkingAmount < 0) {
      return 0;
    } else if (checkingAmount === 0 && creditAmount === 0) {
      return 0.5;
    }
    return checkingAmount / this.availableMeedFlex;
  }

  /**
   * Issue: GMA-4479:Dashboard: Need to remove Yes and No button from the modal.
   * Date: February 28, 2020
   * Developer: Md.Kausar <md.kausar@brainstation23.com>
   * Removed actionButtons fileds from componentProps.
   * @memberof HomeFacade
   */
  async openInfoModal() {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'info-modal-module.home-page.title1',
          details: ['info-modal-module.home-page.details.content1']
        },
        {
          title: 'info-modal-module.home-page.title2',
          details: ['info-modal-module.home-page.details.content2']
        },
        {
          title: 'info-modal-module.home-page.title3',
          details: ['info-modal-module.home-page.details.content3']
        },
        {
          details: ['info-modal-module.home-page.details.content4']
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }
}
