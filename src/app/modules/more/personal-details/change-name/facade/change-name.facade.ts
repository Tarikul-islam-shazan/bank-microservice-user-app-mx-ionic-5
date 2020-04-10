/**
 * Facade: Change Name facade
 * Details: Gettings the customer value for changing First Name,Last Name or Middle Name with a reason .
 * Date: February 17,2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 */
import { ChangeNameRequiredDocumentsPage } from '../../change-name-required-documents/container/change-name-required-documents.page';
import { DropdownModalComponent, ModalService } from '@app/shared';
import { DropdownOption } from '@app/signup/models/signup';
import { ICustomer } from '@app/core';
import { Injectable } from '@angular/core';
import { PersonalDetailsState } from '@app/more/personal-details/facade/personal-details.state';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Injectable()
export class ChangeNameFacade {
  customer: ICustomer = {};

  constructor(
    private modalService: ModalService,
    private personalDetailsState: PersonalDetailsState,
    private translateService: TranslateService
  ) {
    this.getCustomer();
  }

  /**
   * @summary returns customer information
   *
   * @private
   * @returns {Subscription}
   * @memberOf ChangeNameFacade
   */
  private getCustomer(): Subscription {
    return this.personalDetailsState.customer$.subscribe((customer: ICustomer) => {
      this.customer = customer;
    });
  }

  /**
   * @summary closes modal
   *
   * @returns {void}
   * @memberOf ChangeNameFacade
   */
  dismissModal(): void {
    this.modalService.close();
  }

  /**
   * @summary Issue: GMA-4289
   * @summary Converting transation key to value using @ngx-translate.
   */
  getTranlatedValueByKey(key: string): string {
    return this.translateService.instant(key);
  }

  /**
   * @summary opens reason modal
   *
   * @param {DropdownOption[]} reasons
   * @param {(_: any) => void} callback
   * @returns {void}
   * @memberOf ChangeNameFacade
   */
  openReasonModal(reasons: DropdownOption[], callback: (_: any) => void): void {
    this.modalService.openModal(DropdownModalComponent, { data: reasons }, (response: any) => {
      const { data } = response;
      if (data) {
        const selectedReason = data;
        selectedReason.text = this.getTranlatedValueByKey(selectedReason.text);
        selectedReason.subText = this.getTranlatedValueByKey(selectedReason.subText);
        callback(selectedReason);
      }
    });
  }

  /**
   * @sumamry opens document modal
   *
   * @param {FormData} formValue
   * @returns {void}
   * @memberOf ChangeNameFacade
   */
  openDocumentsModal(formValue: FormData): void {
    const componentProps = {
      data: formValue,
      onDidDismiss: (resp: any) => {
        const { data } = resp;
        if (data) {
          this.modalService.close();
        }
      }
    };
    this.modalService.openModal(ChangeNameRequiredDocumentsPage, componentProps);
  }
}
