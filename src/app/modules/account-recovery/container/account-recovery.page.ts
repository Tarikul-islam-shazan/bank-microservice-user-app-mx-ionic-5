/**
 * * Issue: GMA-4723
 * * Issue Details: Account recovery folder structure refactor.
 * * Developer Feedback: issue fixed
 * Date: March 25, 2020
 * Developer: Zahidul Islam <zahidul@bs-23.net>
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mbc-account-recovery',
  templateUrl: './account-recovery.page.html',
  styleUrls: ['./account-recovery.page.scss']
})
export class AccountRecoveryPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  /**
   * Issue: GMA-4778
   * Details:Page Route with router navigator
   * Date: 01 April, 2020
   * Developer: Md.kausar <md.kausar@brainstation23.com>
   * @param {string} pageToNavigate
   * @memberof AccountRecoveryPage
   */
  navigateToPage(pageToNavigate: string): void {
    this.router.navigate([`/account-recovery/${pageToNavigate}`]);
  }
}
