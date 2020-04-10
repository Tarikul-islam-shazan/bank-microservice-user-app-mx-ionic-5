import { Component } from '@angular/core';
import { MoveMoneyFacade } from '../facade/move-money.facade';

/**
 * * Issue: GMA-4420
 * * Issue Details: eCheck: Implement modal for closed status user.
 * * Developer Feedback: modal implemented for close status account
 * Date: February 19, 2020
 * Developer: Zahidul Islam <zahidul@bs-23.net>
 */

@Component({
  selector: 'app-move-money',
  templateUrl: './move-money.page.html',
  styleUrls: ['./move-money.page.scss']
})
export class MoveMoneyPage {
  constructor(public facade: MoveMoneyFacade) {}
}
