import { P2PService } from '@app/p2p/services/p2p.service';
import { Observable } from 'rxjs';
import { IContact } from '@app/p2p/models';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { Router } from '@angular/router';
import { MemberService, REG_EX_PATTERNS } from '@app/core';
import { IMeedModalContent, ModalService } from '@app/shared';
@Injectable()
export class HomeP2PFacade {
  public myPayees: IContact[] = [];
  public myPayees$: Observable<IContact[]>;
  public searchResult: IContact[] = [];
  public startSearching = false;
  constructor(
    private p2pService: P2PService,
    private analytics: AnalyticsService,
    private router: Router,
    private memberService: MemberService,
    private modalService: ModalService
  ) {}

  getAllContacts() {
    this.myPayees$ = this.p2pService.getAllContacts().pipe(map(payees => (this.myPayees = payees)));
  }

  searchContact(query: string) {
    if (query) {
      this.startSearching = true;
    } else {
      this.startSearching = false;
    }
  }

  checkIsSelfEmail(email: string): boolean {
    const regex = new RegExp(REG_EX_PATTERNS.EMAIL);
    const isEmail = regex.test(email);
    return isEmail ? this.memberService.member.email === email : false;
  }

  showSelfEmailAddError() {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'p2p-module.home-page.modal-title',
          details: ['p2p-module.home-page.modal-description']
        }
      ]
    };
    this.modalService.openInfoModalComponent({ componentProps });
  }

  next(payeeTo: string) {
    if (this.checkIsSelfEmail(payeeTo)) {
      this.showSelfEmailAddError();
    } else {
      this.analytics.logEvent(AnalyticsEventTypes.P2PSearchedNext);
      this.router.navigate(['/p2p/registration-type/', payeeTo]);
    }
  }
}
