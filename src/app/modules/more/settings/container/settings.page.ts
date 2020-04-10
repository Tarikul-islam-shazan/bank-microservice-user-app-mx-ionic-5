import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mbc-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  /**
   * Issue: GMA-4749
   * Details:Page Route with router navigator
   * Date:  25 March, 2020
   * Developer: Md.kausar <md.kausar@brainstation23.com>
   * @param {string} pageToNavigate
   * @memberof SettingsPage
   */
  navigateToPage(pageToNavigate: string): void {
    this.router.navigate([`/more/settings/${pageToNavigate}`]);
  }
}
