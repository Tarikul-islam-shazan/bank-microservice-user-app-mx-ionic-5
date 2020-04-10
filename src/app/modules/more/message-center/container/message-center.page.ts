import { Component, OnInit } from '@angular/core';
import { MessageCenterFacade } from '../facade/message-center-facade';

@Component({
  selector: 'mbc-message-center',
  templateUrl: './message-center.page.html',
  styleUrls: ['./message-center.page.scss']
})
export class MessageCenterPage implements OnInit {
  constructor(public messageCenterFacade: MessageCenterFacade) {}

  ngOnInit() {}
}
