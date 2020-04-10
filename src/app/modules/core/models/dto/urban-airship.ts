export interface IUASNamedUserLookupResponse {
  tags: string[];
  channelId?: string;
}

export interface IUASAddRemoveTag {
  namedUser: string;
  tag: string;
}
