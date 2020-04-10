import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'invite-info',
  templateUrl: './invite-info.component.html',
  styleUrls: ['./invite-info.component.scss']
})
export class InviteInfoComponent {
  @Input() emoji: string;
  @Input() header: string;
  @Input() description: string;
  @Input() inviteBtn: boolean;

  constructor(private router: Router) {}

  /**
   *
   * @description goto invite module
   * @memberof InviteInfoComponent
   */
  goToInvite(): void {
    this.router.navigate([`dashboard/invite`]);
  }
}
