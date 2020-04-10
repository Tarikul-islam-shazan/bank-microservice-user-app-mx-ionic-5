import { Component, OnInit } from '@angular/core';
import { ContactPreferencesFacade } from '../facade';

@Component({
  selector: 'mbc-contact-preferences',
  templateUrl: './contact-preferences.page.html',
  styleUrls: ['./contact-preferences.page.scss']
})
export class ContactPreferencesPage implements OnInit {
  constructor(public contactPreferencesFacade: ContactPreferencesFacade) {}

  ngOnInit() {}
}
