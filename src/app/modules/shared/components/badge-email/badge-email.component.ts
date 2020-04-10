/**
 * Shared Component: <badge-email> </badge-email>
 * Details: Badge email input tags
 * Date: January 8th, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */

// Usage:
// <badge-email
//       (typeahead)="Listen typing event: based on this you can search list"
//       (emailsOnChange)="Get the all badged valid mails as string[]"
//       [inputEmails]="if you want to inject some emails"
//       placeholder="input box placeholder">
// </badge-email>

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { REG_EX_PATTERNS } from '@app/core/models';

@Component({
  selector: 'badge-email',
  templateUrl: './badge-email.component.html',
  styleUrls: ['./badge-email.component.scss']
})
export class BadgeEmailComponent implements OnInit {
  email = '';
  private _inputEmails: string[] = [];
  @Input() set inputEmails(emails: string[]) {
    this._inputEmails = emails;
    this.email = '';
  }
  get inputEmails(): string[] {
    return this._inputEmails;
  }
  @Output() emailsOnChange = new EventEmitter<string[]>();
  @Output() typeahead = new EventEmitter<string>();
  @Input() placeholder: string;
  constructor() {}

  ngOnInit(): void {
    this.emailsOnChange.emit(this.inputEmails);
  }

  /**
   * keyUp on input box, if user enter [space] valid the email address and push to badge emails
   * Emaits: user input type for typehead and valid emails list
   * @param {KeyboardEvent} event
   * @memberof BadgeEmailComponent
   */
  createBadgeEmail(event: any): void {
    if (this.isValidString(this.email)) {
      this.typeahead.emit(this.email.trim());
    }
    if (REG_EX_PATTERNS.WHITE_SPACE.test(event.target.value) && REG_EX_PATTERNS.EMAIL.test(this.email.trim())) {
      if (!this.inputEmails.includes(this.email.trim())) {
        this.inputEmails.push(this.email.trim());
        this.email = '';
        this.typeahead.emit(this.email.trim());
        this.emailsOnChange.emit(this.inputEmails);
      }
    }
  }

  removeEmail(index: number): void {
    this.inputEmails.splice(index, 1);
    this.emailsOnChange.emit(this.inputEmails);
  }

  isValidString(stringValue: string): boolean {
    return stringValue.trim().length >= 0;
  }
}
