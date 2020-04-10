import { Component, Input } from '@angular/core';

@Component({
  selector: 'success-modal',
  templateUrl: './success-modal.page.html',
  styleUrls: ['./success-modal.page.scss']
})
export class SuccessModalPage {
  @Input() contents: any;
  @Input() actionButtons: any;
  constructor() {}
}
