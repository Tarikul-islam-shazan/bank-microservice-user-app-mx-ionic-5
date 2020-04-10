/**
 * Facade: sweep facade
 * Details: load sweep state, update sweep state
 * Date: March 03th, 2020
 * Developer: Sudipta <sudipta.ghosh@bs-23.net>
 */

import { Injectable } from '@angular/core';
import { ModalService, IMeedModalContent } from '@app/shared';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { AccountService, ISweepState, SweepState } from '@app/core';
import { Router } from '@angular/router';

@Injectable()
export class SweepFacade {
  sweepStatus = false;
  constructor(
    private accountService: AccountService,
    private modalService: ModalService,
    private analytics: AnalyticsService,
    private router: Router
  ) {
    // this.loadSweepState();
  }

  /**
   *
   * @description load user sweep status
   * @memberof SweepFacade
   */
  loadSweepState(): void {
    this.accountService.getAccountSweepStatus().subscribe((data: ISweepState) => {
      if (data.state === SweepState.Activate) {
        this.sweepStatus = true;
      } else {
        this.sweepStatus = false;
      }
    });
  }

  /**
   *
   * @description change user sweep status
   * @memberof SweepFacade
   */
  changeSweepStatus(): void {
    const apiParms: ISweepState = { state: this.sweepStatus ? SweepState.Activate : SweepState.Deactivate };
    this.accountService.updateAccountSweepStatus(apiParms).subscribe(data => {
      this.analytics.logEvent(AnalyticsEventTypes.SweepStatusUpdated, data);

      const componentProps: IMeedModalContent = {
        contents: [
          {
            title: 'more-module.sweep.sweep-modal-title',
            details: ['more-module.sweep.sweep-modal-details']
          }
        ],
        actionButtons: [
          {
            text: 'more-module.sweep.sweep-modal-btn-text',
            cssClass: 'white-button',
            handler: event => {
              this.modalService.close();
            }
          }
        ],
        onDidDismiss: () => {
          this.router.navigate(['/more/settings']);
        }
      };
      this.modalService.openInfoModalComponent({ componentProps });
    });
  }
}
