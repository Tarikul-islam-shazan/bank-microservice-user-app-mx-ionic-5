/**
 * Feature: Controller
 * Details: This controller of choose from contacts modal.
 * Date: March 30, 2020
 * Developer: Rahadur Rahman <rahadur.rahman@brainstation23.com>
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ChooseContactFacade } from '../facade';

@Component({
  selector: 'choose-contact',
  templateUrl: './choose-contact.page.html',
  styleUrls: ['./choose-contact.page.scss']
})
export class ChooseContactPage implements OnInit, OnDestroy {
  constructor(private router: Router, public facade: ChooseContactFacade) {}

  ngOnInit() {
    this.facade.fetchContacts();
  }

  ngOnDestroy() {
    this.facade.clearSearchText();
  }
}
