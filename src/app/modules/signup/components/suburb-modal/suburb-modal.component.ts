import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { IAddressInfo } from '@app/core';

@Component({
  selector: 'app-suburb-modal',
  templateUrl: './suburb-modal.component.html',
  styleUrls: ['./suburb-modal.component.scss']
})
export class SuburbModalComponent implements OnInit {
  options: IAddressInfo[];
  constructor(private navParams: NavParams, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.options = this.navParams.get('data');
  }

  selectedItem(option: IAddressInfo) {
    this.dismiss(option);
  }

  async dismiss(option?: IAddressInfo): Promise<any> {
    return await this.modalCtrl.dismiss(option);
  }
}
