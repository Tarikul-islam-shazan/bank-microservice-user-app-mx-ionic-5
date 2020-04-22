import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InviteFacade } from './../facade';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss']
})
export class InvitePage {
  constructor(private router: Router, public facade: InviteFacade) {}

  ionViewWillEnter() {
    this.facade.initialize();
  }

  ionViewDidLeave() {
    this.facade.invitations = [];
  }

  onInviteNewFriend() {
    this.router.navigate(['/dashboard/invite/invite-new-member']);
  }
}
