import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MemberService } from '@app/core/services/member.service';
import { PreferenceSettingsService } from '@app/core/services/preference-settings.service';
import { PreferenceKey } from '@app/core/models/dto/member';

@Component({
  selector: 'mbc-extra-intro-modal',
  templateUrl: './extra-intro-modal.component.html',
  styleUrls: ['./extra-intro-modal.component.scss']
})
export class ExtraIntroModalComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private memberService: MemberService,
    private preferenceSettingsService: PreferenceSettingsService
  ) {}

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
  async meedExtraInfoModelHide(): Promise<void> {
    const member = this.memberService.getCachedMember();
    this.preferenceSettingsService
      .updateMeedPrefernces({ [PreferenceKey.MeedExtraIntroPopupShown]: true })
      .subscribe(prefernces => {
        this.memberService.setMember({
          ...member,
          meedExtraIntroPopupShown: true
        });
      });
    await this.modalCtrl.dismiss();
  }
}
