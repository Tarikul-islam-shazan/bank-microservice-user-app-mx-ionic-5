import { InviteService } from './invite.service';
import { ChooseContactService } from './choose-contact.service';
export * from './invite.service';
export * from './choose-contact.service';
export const INVITE_SERVICE = [InviteService, ChooseContactService];
