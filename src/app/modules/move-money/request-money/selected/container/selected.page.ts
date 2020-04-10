import { Component } from '@angular/core';
import { SelectedFacade as Facade } from '@app/move-money/request-money/selected/facade/facade';
@Component({
  selector: 'selected-page',
  templateUrl: './selected.page.html',
  styleUrls: ['./selected.page.scss']
})
export class SelectedPage {
  constructor(public facade: Facade) {}
}
