import { Injectable } from '@angular/core';
interface IInboxMessage {
  id: string;
  title: string;
  dateTime: string;
  isRead: boolean;
}
@Injectable()
export class MessageCenterFacade {
  messages: IInboxMessage[] = [
    { id: '1234', title: 'P2P Request Response', dateTime: '2019-12-20T13:19:52+00:00', isRead: false },
    { id: '1235', title: 'P2P Request Response', dateTime: '2019-12-20T13:19:52+00:00', isRead: true },
    { id: '1236', title: 'P2P Request Response', dateTime: '2019-12-20T13:19:52+00:00', isRead: false }
  ];
  constructor() {}

  showMessageDetails(message: IInboxMessage) {}

  deleteMessageConfirmation(message: IInboxMessage) {}
}
