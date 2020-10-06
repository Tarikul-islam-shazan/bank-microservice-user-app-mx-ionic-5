import { Component } from '@angular/core';
import { GovernmentDisclosureFacade } from '../facade/government-disclosure-facade';
import { IinputOption, InputFormatType } from '@app/shared/directives/mask-input.directive';

@Component({
  selector: 'mbc-government-disclosure',
  templateUrl: './government-disclosure.page.html',
  styleUrls: ['./government-disclosure.page.scss']
})
export class GovernmentDisclosurePage {
  wordsInput: IinputOption;
  constructor(public facade: GovernmentDisclosureFacade) {
    this.wordsInput = {
      type: InputFormatType.WORDS
    };
  }
}
