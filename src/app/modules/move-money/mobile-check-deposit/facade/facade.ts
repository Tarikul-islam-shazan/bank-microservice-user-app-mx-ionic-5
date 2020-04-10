/**
 * Facade: Mobile Check Deposit Facade
 * Details: Checks image preview did not showing problem is fixed and resetting form when user enter again.
 * Date: February 12,2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 */
import { Injectable } from '@angular/core';
import { Logger, AccountService } from '@app/core/services';
import { ModalService, IMeedModalContent } from '@app/shared/services/modal.service';
import { IDepositCheck, DepositFormDataKey } from '@app/move-money/mobile-check-deposit/models';
import { IAccount, AccountType } from '@app/core/models/dto/account';
import { DepositService } from '@app/core/services/deposit.service';
import { MitekService, ChequeSide, IChequeImage } from '@app/move-money/mobile-check-deposit/services/mitek.service';
import * as moment from 'moment';
import { Device } from '@ionic-native/device/ngx';
import { DepositSuccessModalComponent } from '@app/move-money/mobile-check-deposit/components/deposit-success-modal';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { AppPlatform } from '@app/core';
const log = new Logger('MobileCheckDepositFacade');

@Injectable()
export class MobileCheckDepositFacade {
  deposit: Partial<IDepositCheck> = {};
  checkingAccount: IAccount = {} as IAccount;
  constructor(
    private modalService: ModalService,
    private accountService: AccountService,
    private depositService: DepositService,
    private mitekService: MitekService,
    private device: Device,
    private analyticsService: AnalyticsService,
    private platformService: AppPlatform
  ) {
    this.accountService.fetchAccountSummary().subscribe((accounts: IAccount[]) => {
      this.checkingAccount = accounts.find((account: IAccount) => account.accountType === AccountType.DDA);
    });
  }

  submitCheckDeposit(): void {
    this.deposit = {
      ...this.deposit,
      depositDate: moment().format('MM/DD/YYYY'),
      currency: 'USD',
      accountNumber: this.checkingAccount.accountNumber,
      deviceKey: this.device.model,
      deviceDescription: this.device.manufacturer
    };

    this.depositService.submitCheque(this.generateFormData()).subscribe(data => {
      if (data.processingStatus) {
        this.analyticsService.logEvent(AnalyticsEventTypes.MobileCheckDeposited, { amount: this.checkingAccount });
        this.modalService.openModal(DepositSuccessModalComponent, {
          data: {
            deposit: this.deposit,
            depositCheckConfirmationNumber: data.depositCheckConfirmationNumber
          }
        });
      }
    });
  }

  generateFormData(): FormData {
    const depositFormData = new FormData();
    depositFormData.append(DepositFormDataKey.Amount, this.deposit.amount);
    depositFormData.append(DepositFormDataKey.Notes, this.deposit.notes);
    depositFormData.append(DepositFormDataKey.DepositDate, this.deposit.depositDate);
    depositFormData.append(DepositFormDataKey.Currency, this.deposit.currency);
    depositFormData.append(DepositFormDataKey.AccountNumber, this.deposit.accountNumber);
    depositFormData.append(DepositFormDataKey.DeviceKey, this.deposit.deviceKey);
    depositFormData.append(DepositFormDataKey.DeviceDescription, this.deposit.deviceDescription);
    depositFormData.append(
      DepositFormDataKey.FrontCheckImage,
      this.mitekService.base64toBlob(this.mitekService.chequeImage.front, 'image/png'),
      'front_check_image.png'
    );
    depositFormData.append(
      DepositFormDataKey.BackCheckImage,
      this.mitekService.base64toBlob(this.mitekService.chequeImage.back, 'image/png'),
      'back_check_image.png'
    );
    return depositFormData;
  }

  get chequeSide() {
    return ChequeSide;
  }

  get chequeImage(): IChequeImage {
    return this.mitekService.chequeImage;
  }

  renderImage(encodedImage: string): string {
    return `data:image/jpg;base64,${encodedImage}`;
  }

  /**
   * Resetting Mobile Check Deposit Form fields value .
   * @memberof MobileCheckDepositFacade]
   */
  resetMobileCheckDepositForm(): void {
    this.deposit = {};
    this.mitekService.resetCheckImage();
  }

  /**
   * Issue: GMA-4717
   * Details: Need settings permission modal if the user try to access camera after denied
   * the camera permission first time
   * Date: 18-March-2020
   * Developer: Rahadur Rhaman <rahadur.rahman@brainstation23.com>
   */
  async startCapture(chequeSide: ChequeSide): Promise<void> {
    if (this.platformService.isCordova()) {
      const cameraPermission = await this.platformService.requestCameraPermission();
      if (cameraPermission) {
        if (this.platformService.isAndroid()) {
          const storagePermission = await this.platformService.requestExternalStoragePermission();
          if (storagePermission) {
            await this.mitekService.startMiSnapCaptureCheque(chequeSide);
          } else {
            await this.permissionInfoModal();
          }
        } else {
          await this.mitekService.startMiSnapCaptureCheque(chequeSide);
        }
      } else {
        // Show Permission Info Modal
        await this.permissionInfoModal();
      }
    }
  }
  get formValidation(): boolean {
    if (this.deposit.amount && this.deposit.notes && this.chequeImage.front && this.chequeImage.back) {
      return true;
    }
    return false;
  }

  /**
   * This method will show Info modal if user disable Camera and Storage permission
   *
   * @param { null }
   * @returns { Promise<void> }
   */
  private async permissionInfoModal(): Promise<void> {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'mobile-check-deposit.permission-info-modal.title',
          details: ['mobile-check-deposit.permission-info-modal.details']
        }
      ],
      actionButtons: [
        {
          text: 'mobile-check-deposit.permission-info-modal.setting-button-text',
          cssClass: 'white-button',
          handler: async () => {
            await this.platformService.openNativeAppSetting();
            await this.modalService.close();
          }
        },
        {
          text: 'mobile-check-deposit.permission-info-modal.cancel-button-text',
          cssClass: 'grey-outline-button',
          handler: async () => {
            await this.modalService.close();
          }
        }
      ]
    };

    await this.modalService.openInfoModalComponent({ componentProps });
  }
}
