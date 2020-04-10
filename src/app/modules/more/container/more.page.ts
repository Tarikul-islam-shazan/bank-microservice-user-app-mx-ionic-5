/**
 * Container: More page
 * Details: User can navigate meed more options.
 * Date: 07/02/2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 * Include Ticket ID:GMA-4145: Issue fixed for the Face Id/TauchId with toggle button.
 */

import { Component, OnInit } from '@angular/core';
import { Logger } from '@app/core';
import { MoreFacade as Facade } from '@app/more/facade/more.facade';
import { IMoreMenuItem } from '../models/more';

const log = new Logger('MoreMenu');
@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss']
})
export class MorePage implements OnInit {
  moreMenuList: IMoreMenuItem[] = [];
  constructor(public facade: Facade) {}

  ngOnInit() {}
  ionViewDidEnter() {
    this.moreMenuList = this.facade.moreMenuList;
    this.facade.updateIsFaceIdOrTouchIDisEnabled();
  }
}
