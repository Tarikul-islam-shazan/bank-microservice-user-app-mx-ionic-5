import { Component } from '@angular/core';
import { ConfirmFacade as Facade } from '@app/move-money/send-money/confirm/facade/facade';
@Component({
  selector: 'confirm-page',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss']
})
export class ConfirmPage {
  constructor(public facade: Facade) {}
}
