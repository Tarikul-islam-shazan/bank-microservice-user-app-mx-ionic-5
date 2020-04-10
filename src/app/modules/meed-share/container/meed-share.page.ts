import { Component, OnInit } from '@angular/core';
import { MeedShareFacade } from '../facade';
import { ModalService, IMeedModalContent } from '@app/shared';

@Component({
  selector: 'mbc-meed-share',
  templateUrl: './meed-share.page.html',
  styleUrls: ['./meed-share.page.scss']
})
export class MeedSharePage {
  constructor(public meedShareFacade: MeedShareFacade, private modalService: ModalService) {}
}
