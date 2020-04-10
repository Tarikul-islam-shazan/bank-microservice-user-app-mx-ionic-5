export interface IUASRegEmail {
  type: string;
  commercial_opted_in: string;
  address: string;
  timezone: string;
  locale_country: string;
  locale_language: string;
}

export interface IUASUpdateEmail {
  channelID: string;
  type: string;
  commercial_opted_in?: string;
  address: string;
}

export interface IUASCommonResponse {
  ok?: boolean;
  channel_id?: string;
}

export interface IUASNameLookupRequest {
  namedUser: string;
}
export interface IUASNameLookupResponse {
  channelId?: string;
}

export interface IUASAssociateEmailToNamedUserId {
  channel_id: string;
  device_type?: string;
  named_user_id: string;
}

export interface IUASAddInitialTags {
  namedUser: string;
  banks: string[];
}

export enum ChannelTypes {
  Email = 'email'
}
