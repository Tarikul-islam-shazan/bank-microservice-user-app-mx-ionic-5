import { Injectable } from '@angular/core';
import { ChatMessage } from '@app/more/virtual-assistant/models';
@Injectable()
export class VirtualAssistantService {
  constructor() {}

  gotReplyFromLiveVirtualAssistantMsg(msg) {
    const replyMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: 'assistance',
      toUserId: 'self',
      time: Date.now(),
      message: msg.message,
      status: 'success',
      relativeResults: msg.relativeResults ? msg.relativeResults : [],
      dialogueResults: msg.dialogueResults ? msg.dialogueResults : []
    };
    return replyMsg;
  }

  buildSelfAssistantMsg(msg) {
    const replyMsg: ChatMessage = {
      messageId: Date.now().toString(),
      userId: 'self',
      toUserId: 'assistance',
      time: Date.now(),
      message: msg.message,
      status: 'success',
      relativeResults: [],
      dialogueResults: []
    };
    return replyMsg;
  }

  buildAssistanReply(chatResponse, chatResult) {
    const assistanReply = {
      message: '',
      relativeResults: [],
      dialogueResults: []
    };
    switch (chatResponse.part_type) {
      case 'normal':
        assistanReply.message = chatResponse.text;
        break;
      case 'prompt':
        assistanReply.message = chatResponse.text;
        if (chatResult.related_results.length > 0) {
          assistanReply.relativeResults = chatResult.related_results;
        }
        if (chatResult.dialogue.connectors.length > 0) {
          chatResult.dialogue.connectors.forEach(connector => {
            const connectorObject = {
              click_text: connector.click_text,
              DTreeRequestType: 2,
              Connector_ID: connector.connector_id,
              DTREE_OBJECT_ID: chatResult.dialogue.dtree_id,
              DTREE_NODE_ID: chatResult.dialogue.dtree_node_id,
              ICS_SOURCE_ANSWER_ID: chatResult.answer_id,
              isdisabled: false
            };
            assistanReply.dialogueResults.push(connectorObject);
          });
          if (chatResult.dialogue.back_navigation) {
            const connectorNavigationObject = {
              click_text: chatResult.dialogue.back_text,
              DTreeRequestType: 3,
              Connector_ID: '',
              DTREE_OBJECT_ID: chatResult.dialogue.dtree_id,
              DTREE_NODE_ID: chatResult.dialogue.dtree_node_id,
              ICS_SOURCE_ANSWER_ID: '',
              isdisabled: false
            };
            assistanReply.dialogueResults.push(connectorNavigationObject);
          }
        }
        break;
    }
    return this.gotReplyFromLiveVirtualAssistantMsg(assistanReply);
  }
}
