import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InviteNewMemberFacade } from '../facade/invite-new-member-facade';

@Component({
  selector: 'app-invite-new-member',
  templateUrl: './invite-new-member.page.html',
  styleUrls: ['./invite-new-member.page.scss']
})
export class InviteNewMemberPage {
  constructor(private router: Router, public facade: InviteNewMemberFacade) {}

  ionViewWillEnter() {
    this.facade.getContacts();
  }

  onContinueClick(): void {
    this.router.navigate(['/dashboard/invite/invite-new-member-confirm']);
  }
}
