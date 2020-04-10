import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingsService } from '@app/core';
import { UserSettings } from '@app/core/models/app-settings';

@Component({
  selector: 'mbc-extra-intro-modal',
  templateUrl: './extra-intro-modal.component.html',
  styleUrls: ['./extra-intro-modal.component.scss']
})
export class ExtraIntroModalComponent implements OnInit {
  constructor(private modalCtrl: ModalController, private settingService: SettingsService) {}

  ngOnInit() {}

  async dismiss() {
    return await this.modalCtrl.dismiss();
  }

  /**
   *
   * @description hide modal by user action
   * @returns
   * @memberof ExtraIntroModalComponent
   */
  async meedExtraInfoModelHide() {
    const userSettings: UserSettings = {
      ...this.settingService.getSettings().userSettings,
      meedExtraInfoNotShow: true
    };
    this.settingService.setUserSettings(userSettings);
    return await this.modalCtrl.dismiss();
  }
}
