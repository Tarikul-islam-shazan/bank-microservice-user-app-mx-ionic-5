import { Component } from '@angular/core';
import { InviteNewMemberConfirmFacade } from '../facade/invite-new-member-confirm-facade';

@Component({
  selector: 'invite-new-member-confirm',
  templateUrl: './invite-new-member-confirm.page.html',
  styleUrls: ['./invite-new-member-confirm.page.scss']
})
export class InviteNewMemberConfirmPage {
  constructor(public facade: InviteNewMemberConfirmFacade) {}
}
