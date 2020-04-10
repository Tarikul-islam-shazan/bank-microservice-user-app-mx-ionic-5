export interface VirtualAssistantResponse {
  info: any;
  session: any;
  result: any;
  inteface: any;
}
export interface InitializeRequest {
  language: string;
}
export interface ChatMessage {
  messageId: string;
  userId: string;
  toUserId: string;
  time: number | string;
  message: string;
  status: string;
  relativeResults: any;
  dialogueResults: any;
  agentCallRandomNumber?: string;
}
export class UserInfo {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface ChatSessionRequest {
  ident: string;
  language: string;
  email: string;
  firstName: string;
  lastName: string;
  timeZone: string;
  userLocalTime: string;
}
