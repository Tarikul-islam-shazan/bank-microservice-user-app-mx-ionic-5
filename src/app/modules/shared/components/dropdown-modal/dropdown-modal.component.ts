import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { DropdownOption } from '@app/signup/models/signup';

@Component({
  selector: 'app-dropdown-modal',
  templateUrl: './dropdown-modal.component.html',
  styleUrls: ['./dropdown-modal.component.scss']
})
export class DropdownModalComponent implements OnInit {
  options: DropdownOption[];
  constructor(private navParams: NavParams, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.options = this.navParams.get('data');
  }

  selectedItem(option: DropdownOption) {
    this.dismiss(option);
  }

  async dismiss(option?: DropdownOption): Promise<any> {
    return await this.modalCtrl.dismiss(option);
  }
}
