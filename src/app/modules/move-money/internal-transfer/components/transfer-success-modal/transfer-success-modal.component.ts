import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ITransferSuccessModalObject, TransferType } from '@app/move-money/internal-transfer/models';
import { AccountType } from '@app/core/models/dto/account';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'mbc-transfer-success-modal',
  templateUrl: './transfer-success-modal.component.html',
  styleUrls: ['./transfer-success-modal.component.scss']
})
export class TransferSuccessModalComponent {
  @Input() data: ITransferSuccessModalObject;

  constructor(private modalCtrl: ModalController, private translate: TranslateService) {}

  async dismiss(option?: any): Promise<any> {
    return await this.modalCtrl.dismiss(option);
  }

  // We get data in modal as data input, so need to rename with appropriate object name
  get transferModalData(): ITransferSuccessModalObject {
    return this.data;
  }

  // If internal transfer type is not Immediate, we will show view scheduled transfer button
  // So user can directly go-to schedule transfer list
  isScheduleTransfer() {
    if (this.transferModalData.transferType === TransferType.Immediate) {
      return false;
    }
    return true;
  }

  // From transfer success we get account Type as DDA, SSA or LOC, so here we translate the account type.
  accountTypeTranslation(accountType: string) {
    switch (accountType) {
      case AccountType.DDA:
        return this.translate.instant('move-money-module.internal-transfer.transfer-success-modal.checking-text');
      case AccountType.SSA:
        return this.translate.instant('move-money-module.internal-transfer.transfer-success-modal.savings-text');
      case AccountType.LOC:
        return this.translate.instant('move-money-module.internal-transfer.transfer-success-modal.line-of-credit-text');
    }
  }
}
