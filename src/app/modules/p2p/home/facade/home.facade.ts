import { P2PService } from '@app/p2p/services/p2p.service';
import { Observable, Subscription } from 'rxjs';
import { IContact } from '@app/p2p/models';
import { Injectable, OnDestroy } from '@angular/core';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { Router } from '@angular/router';
import { MemberService, REG_EX_PATTERNS } from '@app/core';
import { IMeedModalContent, ModalService } from '@app/shared';
import { share } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class HomeP2PFacade {
  public myPayees$: Observable<IContact[]>;
  public searchResult: IContact[] = [];
  public startSearching = false;
  constructor(
    private p2pService: P2PService,
    private analytics: AnalyticsService,
    private router: Router,
    private memberService: MemberService,
    private modalService: ModalService,
    private translate: TranslateService,
    public alertController: AlertController
  ) {}

  getAllContacts(): Observable<IContact[]> {
    return this.p2pService.getAllContacts().pipe(share());
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

  /**
   *
   * @summary A function to delete my bill Account
   * @param {IBillPayee} billAccount
   * @memberof BillPayFacade
   */

  deletePayee(payee: IContact) {
    const name = payee.alias;
    this.translate
      .get(
        [
          'p2p-module.home-page.delete-alert.header',
          'p2p-module.home-page.delete-alert.message',
          'p2p-module.home-page.delete-alert.btn-cancel',
          'p2p-module.home-page.delete-alert.btn-confirm'
        ],
        { name }
      )
      .subscribe(messages => {
        this.presentAlertConfirmToDelete(messages, payee._id);
      });
  }

  async presentAlertConfirmToDelete(messages: string[], payeeId: string) {
    const alert = await this.alertController.create({
      cssClass: 'delete-bill-account-alert',
      header: messages['p2p-module.home-page.delete-alert.header'],
      message: messages['p2p-module.home-page.delete-alert.message'],
      buttons: [
        {
          text: messages['p2p-module.home-page.delete-alert.btn-cancel'],
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        },
        {
          text: messages['p2p-module.home-page.delete-alert.btn-confirm'],
          handler: () => {
            this.p2pService.deleteInvexOrOtherDomesticContact(payeeId).subscribe(() => {
              this.myPayees$ = this.getAllContacts();
            });
          }
        }
      ]
    });

    await alert.present();
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
