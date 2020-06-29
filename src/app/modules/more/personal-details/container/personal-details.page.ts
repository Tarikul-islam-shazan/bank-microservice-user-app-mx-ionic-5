/**
 * Issue:  GMA-4289
 * Details: Add middle name into middle name field
 * Date: March 05, 2020
 * Developer: Raihan <raihanuzzaman@bs-23.net>
 */
import { Component, OnInit } from '@angular/core';
import { PersonalDetailsFacade } from '../facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.page.html',
  styleUrls: ['./personal-details.page.scss']
})
export class PersonalDetailsPage implements OnInit {
  constructor(public facade: PersonalDetailsFacade, private router: Router) {}

  ngOnInit() {
    this.getCustomerInfo();
  }

  /**
   * @summary gets customer information
   *
   * @private
   * @returns {void}
   * @memberOf PersonalDetailsPage
   */
  private getCustomerInfo(): void {
    this.facade.getCustomerInfo();
  }

  /**
   * @summary opens edit modal
   *
   * @param {*} componentName
   * @returns {Promise<void>}
   * @memberOf PersonalDetailsPage
   */
  async openModal(componentName: string): Promise<void> {
    this.facade.openEditModal(componentName);
  }

  goToChangeAddress() {
    // change-address
    this.router.navigate([`/more/personal-details/change-address`]);
  }
}
