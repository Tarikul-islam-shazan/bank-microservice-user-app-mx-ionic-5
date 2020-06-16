import { Component } from '@angular/core';
import { ContactUsFacade } from '@app/more/contact-us/facade/facade';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss']
})
export class ContactUsPage {
  constructor(public contactUsFacade: ContactUsFacade) {}
}
