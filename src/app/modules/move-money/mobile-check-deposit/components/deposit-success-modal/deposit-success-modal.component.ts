import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IDepositCheck } from '@app/move-money/mobile-check-deposit/models';
@Component({
  selector: 'deposit-success-modal',
  templateUrl: './deposit-success-modal.component.html',
  styleUrls: ['./deposit-success-modal.component.scss']
})
export class DepositSuccessModalComponent {
  @Input() deposit: IDepositCheck;
  @Input() depositCheckConfirmationNumber: string;
  constructor(private modalCtrl: ModalController) {}
  async dismiss(option?: any): Promise<any> {
    return await this.modalCtrl.dismiss(option);
  }
}
