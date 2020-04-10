import { Injectable } from '@angular/core';
import { Logger } from '@app/core/services';
import * as momentTimeZone from 'moment-timezone';
import { IonContent } from '@ionic/angular';
import { VirtualAssistantApiService } from '@app/core/services';
import { VirtualAssistantService, LiveChatService } from '@app/more/virtual-assistant/services';
import { SettingsService, ErrorService } from '@app/core/services';
import { MemberService } from '@app/core/services/member.service';
import { IMember } from '@app/core/models/dto/member';
import { VirtualAssistantResponse, InitializeRequest, ChatMessage, UserInfo } from '@app/more/virtual-assistant/models';
const log = new Logger('VirtualAssistantFacade');

/**
 *
 * Responsible for virtual assistace bot handle and live chat websocket handle
 * @export
 * @class VirtualAssistantFacade
 */
@Injectable()
export class VirtualAssistantFacade {
  virtualAssistantSession: any; // store VA session information to send next ident
  liveChatSession: any; // store live chat session information
  messageList: ChatMessage[] = []; // store all message incoming and outgoing in array for render UI and save chat history
  scrollContent: IonContent;
  user: UserInfo;
  toUser: UserInfo;
  suggestedEntries: any[];
  memberData: IMember;
  constructor(
    private virtualAssistantApiService: VirtualAssistantApiService, // virtual assistant api service
    private virtualAssistantService: VirtualAssistantService, // virtual assistant message build service
    private liveChatService: LiveChatService, // Live chat socket handle and message code build service
    private settingsService: SettingsService,
    private memberService: MemberService, // get the login member information for passing to VA (email, firstName, lastName),
    private errorService: ErrorService
  ) {
    this.memberData = this.memberService.getCachedMember();
    // init chat message self UI info
    this.user = {
      id: 'self',
      email: this.memberData.email,
      firstName: this.memberData.nickname,
      lastName: this.memberData.username
    };
    // init chat message assistance UI info
    this.toUser = {
      id: 'assistance',
      name: 'Meed'
    };
  }
  /**
   * initialize virtual assistant
   * @alias    initialize
   * @memberof VirtualAssistantFacade
   */
  initialize() {
    if (this.messageList.length === 0) {
      const queryParameters: InitializeRequest = {
        language: this.settingsService.getCurrentLocale().locale
      };
      this.virtualAssistantApiService
        .initialize(queryParameters)
        .subscribe((initializeResponse: VirtualAssistantResponse) => {
          this.virtualAssistantSuccessResponse(initializeResponse);
        });
    }
  }
  /**
   * Handle virtual assistance success response, Response return from VA [or request from live chat]
   * @alias    virtualAssistantSuccessResponse
   * @memberof VirtualAssistantFacade
   */
  virtualAssistantSuccessResponse(virtualAssistanceReply: VirtualAssistantResponse) {
    if (virtualAssistanceReply.inteface.livechat_requested) {
      setTimeout(() => {
        this.createLiveChatSession(virtualAssistanceReply);
      }, 100);
    }
    if (virtualAssistanceReply.info.status === 'success') {
      if (virtualAssistanceReply.result.answer_id !== '14' && virtualAssistanceReply.result.answer_id !== '352') {
        log.info('we need restart the chat idelness');
      }
      this.virtualAssistantSession = virtualAssistanceReply.session;
      if (virtualAssistanceReply.inteface) {
        if (virtualAssistanceReply.inteface.freetext) {
          this.suggestedEntries = virtualAssistanceReply.inteface.suggested_entries;
        }
      }
      virtualAssistanceReply.result.chat_response.forEach((chatRespons, index) => {
        this.drawMessageUI(this.virtualAssistantService.buildAssistanReply(chatRespons, virtualAssistanceReply.result));
      });
    }
  }

  /**
   * Handle Send message from UI, first draw self UI, then call VA chat api for chat response
   * @alias    sendMessage
   * @memberof VirtualAssistantFacade
   */
  sendMessage(inputMessage: string) {
    this.drawMessageUI(this.virtualAssistantService.buildSelfAssistantMsg({ message: inputMessage }));
    if (this.liveChatService.socketInfo.liveChatActive) {
      this.liveChatService.sendLiveChatMessage(inputMessage, this.user.firstName);
      return false;
    }
    this.virtualAssistantApiService
      .chat({
        userlogid: this.virtualAssistantSession.userlogid,
        ident: this.virtualAssistantSession.ident,
        channel: this.virtualAssistantSession.channel,
        business_area: this.virtualAssistantSession.business_area,
        entry: encodeURI(inputMessage)
      })
      .subscribe((virtualAssistanceReply: VirtualAssistantResponse) => {
        this.virtualAssistantSuccessResponse(virtualAssistanceReply);
      });
  }

  /**
   * submit suggested response from UI, basically a send message
   * @alias    submitSuggestedEntry
   * @memberof VirtualAssistantFacade
   */
  submitSuggestedEntry(suggestedEntry: string) {
    this.sendMessage(suggestedEntry);
  }

  /**
   * Send FAQ message from UI, respoinse list action from VA chat bot
   * @alias    sendFaqMsg
   * @memberof VirtualAssistantFacade
   */
  sendFaqMsg(relativeResult: any) {
    this.drawMessageUI(this.virtualAssistantService.buildSelfAssistantMsg({ message: relativeResult.question_text }));
    this.virtualAssistantApiService
      .chat({
        userlogid: this.virtualAssistantSession.userlogid,
        ident: this.virtualAssistantSession.ident,
        channel: this.virtualAssistantSession.channel,
        business_area: this.virtualAssistantSession.business_area,
        entry: encodeURI(relativeResult.question_text),
        faq: 1,
        recognition_id: relativeResult.recognition_id,
        answer_id: relativeResult.answer_id
      })
      .subscribe((virtualAssistanceReply: VirtualAssistantResponse) => {
        this.virtualAssistantSuccessResponse(virtualAssistanceReply);
      });
  }

  /**
   * Create live chat session, handover from VA bot to live agent
   * @alias    createLiveChatSession
   * @memberof VirtualAssistantFacade
   */
  createLiveChatSession(virtualAssistanceReply: VirtualAssistantResponse) {
    this.virtualAssistantApiService
      .chatSession({
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        timeZone: momentTimeZone.tz.guess(),
        userLocalTime: momentTimeZone.tz().format('LT'),
        ident: virtualAssistanceReply.session.ident,
        language: this.settingsService.getCurrentLocale().locale
      })
      .subscribe((chatSessionResponse: any) => {
        this.liveChatSession = chatSessionResponse;
        this.liveChatService.createWebsocketConnection(chatSessionResponse, 0);
        this.addListenerForWebsocketMessage();
      });
  }

  /**
   * Obserabe socket message listener from Live Chat, handel by liveChatService
   * @alias    addListenerForWebsocketMessage
   * @memberof VirtualAssistantFacade
   */
  addListenerForWebsocketMessage() {
    this.liveChatService.onWebSocktOnMessage().subscribe(message => {
      this.drawMessageUI(this.virtualAssistantService.gotReplyFromLiveVirtualAssistantMsg(message));
    });
  }

  /**
   * Push the build message [sender or receiver] to messageList for render UI, and also scroll to bottom to see the latest message
   * @alias    drawMessageUI
   * @memberof VirtualAssistantFacade
   */
  drawMessageUI(msg: ChatMessage) {
    this.messageList.push(msg);
    this.scrollToBottom();
  }
  /**
   * Message box UI scroll to bottom, to see the latest message automatically [when reveice or send]
   * @alias    scrollToBottom
   * @memberof VirtualAssistantFacade
   */
  scrollToBottom() {
    setTimeout(() => {
      try {
        this.scrollContent.scrollToBottom();
      } catch (error) {}
    }, 400);
  }
}
