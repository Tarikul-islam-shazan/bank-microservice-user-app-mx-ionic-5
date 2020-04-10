import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LoadingService } from '@app/core/services';
import { Logger } from '@app/core/services';

declare var window: any;
const log = new Logger('LiveChatService');
@Injectable()
export class LiveChatService {
  socketInfo: any = {
    webSockt: null,
    roomID: null,
    customerID: null,
    sessionID: null,
    ping: null,
    liveChatActive: false,
    agentComposingMessage: [],
    reconectionOptions: {
      connectionTimeout: 4000,
      maxRetries: 10,
      debug: false
    }
  };
  constructor(private translateService: TranslateService, private loadingService: LoadingService) {}

  createWebsocketConnection(userData, reconnection) {
    this.loadingService.show({
      loadingMessage: this.translateService.instant('more-module.virtual-assistant.live-chat.loading-message')
    });
    if (window.WebSocket === undefined) {
      log.error('sockets not supported');
      this.loadingService.dismiss();
    } else {
      this.socketInfo.customerID = userData.customerID;
      this.socketInfo.sessionID = userData.sessionID;
      let urls = [
        `${environment.virtualAssistance.websocketUrl}?${userData.customerID}:${userData.sessionID}:${reconnection}`
      ];
      let urlIndex = 0;
      const urlProvider = () => urls[urlIndex++ % urls.length];
      this.socketInfo.webSockt = new ReconnectingWebSocket(urlProvider, [], this.socketInfo.reconectionOptions);

      this.socketInfo.webSockt.addEventListener('open', event => {
        this.loadingService.dismiss();
        reconnection = 1;
        urls = [
          `${environment.virtualAssistance.websocketUrl}?${userData.customerID}:${userData.sessionID}:${reconnection}`
        ];
        this.socketInfo.liveChatActive = true;
        const responseDataWS = {
          messageCode: 24,
          customerId: this.socketInfo.customerID,
          fromId: this.socketInfo.sessionID
        };
        this.socketInfo.ping = setInterval(() => {
          this.socketInfo.webSockt.send(JSON.stringify(responseDataWS));
        }, 20000);
      });
      this.socketInfo.webSockt.addEventListener('close', event => {
        clearInterval(this.socketInfo.ping);
        this.socketInfo.liveChatActive = false;
      });
      this.socketInfo.webSockt.addEventListener('error', event => {
        this.socketInfo.liveChatActive = false;
      });
    }
  }
  public onWebSocktOnMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socketInfo.webSockt.addEventListener('message', (event: any) => {
        if (this.populateWebSocktMessage(event)) {
          observer.next(this.populateWebSocktMessage(event));
        }
      });
    });
  }

  populateWebSocktMessage(event: any) {
    const messageResponse = JSON.parse(event.data);
    switch (messageResponse.messageCode) {
      case 1:
        const expectedWaitTimes = messageResponse.expectedWaitTime ? messageResponse.expectedWaitTime : 'few';
        return {
          message: this.translateService.instant('more-module.virtual-assistant.live-chat.message-code-1', {
            expectedWaitTime: expectedWaitTimes
          })
        };
      case 10:
        this.socketInfo.roomID = messageResponse.roomId;
        return {
          message: this.translateService.instant('more-module.virtual-assistant.live-chat.message-code-10', {
            agentName: messageResponse.agentName
          })
        };
      case 16:
        this.socketInfo.roomID = messageResponse.roomId;
        break;
      case 17:
        break;
      case 25:
        return {
          message: `<i>${messageResponse.fromName}</i>: ${messageResponse.messageText}`
        };
      case 38:
        this.socketInfo.liveChatActive = false;
        return {
          message: `${messageResponse.message}`
        };
      case 31:
        return {
          message: this.translateService.instant('more-module.virtual-assistant.live-chat.message-code-31')
        };
      case 33:
        this.socketInfo.liveChatActive = true;
        this.socketInfo.roomID = messageResponse.roomDetails.roomId;
        return {
          message: this.translateService.instant('more-module.virtual-assistant.live-chat.message-code-33')
        };
      case 13:
        this.socketInfo.liveChatActive = false;
        return {
          message: this.translateService.instant('more-module.virtual-assistant.live-chat.message-code-13')
        };
      case 35:
        this.clearWebSocketConnection();
        return {
          message: this.translateService.instant('more-module.virtual-assistant.live-chat.message-code-35')
        };
      case 40:
        return {
          message: `<i>${messageResponse.fromName}</i>: ${messageResponse.messageText}`
        };
      case 6:
        return {
          message: this.translateService.instant('more-module.virtual-assistant.live-chat.message-code-6')
        };
      case 8:
        return {
          message: this.translateService.instant('more-module.virtual-assistant.live-chat.message-code-8')
        };
      case 4:
        break;
      case 5:
        break;
    }
  }

  sendLiveChatMessage(message: string, userName: string) {
    const outMessage = {
      messageCode: 25,
      customerId: this.socketInfo.customerID,
      fromId: this.socketInfo.sessionID,
      fromName: userName,
      messageText: message,
      roomId: this.socketInfo.roomID,
      queueId: 1,
      messageTimestamp: new Date()
    };
    this.socketInfo.webSockt.send(JSON.stringify(outMessage));
  }

  clearWebSocketConnection() {
    if (this.socketInfo.webSockt) {
      this.socketInfo.webSockt.removeEventListener('open', event => {
        log.info('removeEventListener open', event);
      });
      this.socketInfo.webSockt.removeEventListener('message', event => {
        log.info('removeEventListener message', event);
      });
      this.socketInfo.webSockt.removeEventListener('close', event => {
        log.info('removeEventListener close', event);
      });
      this.socketInfo.webSockt.removeEventListener('error', event => {
        log.info('removeEventListener error', event);
      });
      this.socketInfo.webSockt.close();
    }
  }
}
