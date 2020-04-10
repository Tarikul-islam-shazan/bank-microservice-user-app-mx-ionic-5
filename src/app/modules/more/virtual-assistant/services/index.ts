import { VirtualAssistantService } from './virtual-assistant.service';
import { LiveChatService } from './live-chat.service';
export const VIRTUAL_ASSISTANT_PROVIDERS: any[] = [VirtualAssistantService, LiveChatService];

export * from './virtual-assistant.service';
export * from './live-chat.service';
