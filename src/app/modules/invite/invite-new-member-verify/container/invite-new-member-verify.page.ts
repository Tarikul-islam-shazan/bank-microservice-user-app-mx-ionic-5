import { Component } from '@angular/core';
import { InviteNewMemberVerifyFacade } from '../facade';

@Component({
  selector: 'invite-new-member-verify',
  templateUrl: './invite-new-member-verify.page.html',
  styleUrls: ['./invite-new-member-verify.page.scss']
})
export class InviteNewMemberVerifyPage {
  constructor(public facade: InviteNewMemberVerifyFacade) {}

  ionViewWillLeave() {
    this.facade.removeExistingMeedMemberEmails();
  }
}
