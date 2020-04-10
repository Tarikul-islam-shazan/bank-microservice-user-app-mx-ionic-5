import { Component } from '@angular/core';
import { ChangeLanguageFacade } from '../facade';

@Component({
  selector: 'mbc-change-language',
  templateUrl: './change-language.page.html',
  styleUrls: ['./change-language.page.scss']
})
export class ChangeLanguagePage {
  constructor(public changeLanguageFacade: ChangeLanguageFacade) {}
}
