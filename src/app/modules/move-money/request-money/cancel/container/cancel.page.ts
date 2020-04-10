import { Component } from '@angular/core';
import { CancelFacade as Facade } from '@app/move-money/request-money/cancel/facade/facade';
@Component({
  selector: 'cancel-page',
  templateUrl: './cancel.page.html',
  styleUrls: ['./cancel.page.scss']
})
export class CancelPage {
  constructor(public facade: Facade) {}
}
