import { AccountStore } from './account-store';
import { MemberStore } from './member-store';

export const STORE_PROVIDERS: any[] = [MemberStore, AccountStore];

export * from './member-store';
export * from './account-store';
