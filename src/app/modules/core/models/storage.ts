// standard localStorage interface
export interface IStorage {
  setItem(key: StorageKey, value: any): void;
  getItem(key: StorageKey): any;
  removeItem(key: StorageKey): void;
}

// to limit interaction with localStorage to a certain whitelist, you can list those keys here
// any key that is planned to be stored in local storage must be defined here first and accessed using
// this enum
export enum StorageKey {
  APPSETTINGS = 'appsettings',
  TRANSLATIONS = 'translations'
}

// import { Setter } from './patterns';
// import { Getter } from './patterns';
// import { Remover } from './patterns';
// // standard localStorage interface
// export interface Storage<T> extends Getter<T>, Setter<T>, Remover<T> {
//   setItem(key: T, value: any): void;
//   getItem(key: T): any;
//   removeItem(key: T): void;
// }

// // to limit interaction with localStorage to a certain whitelist, you can list those keys here
// // any key that is planned to be stored in local storage must be defined here first and accessed using
// // this enum
// export enum StorageKey {
//   USERNAME
// }

// // standard localStorage interface
// export interface Getter<T> {
//   getItem(key: T): any;
// }

// // standard localStorage interface
// export interface Setter<S> {
//   setItem(key: S, value: any): void;
// }

// export interface Remover<T> {
//   removeItem(key: T): void;
// }

// export interface RegEx<T> extends Getter<T> {
//   getItem(key: T): any;
// }

// export enum RegExKey {
//   EMAIL
// }

// export class RegExPatterns implements RegEx<RegExKey> {
//   private patterns: Map<RegExKey, any> = null;

//   constructor(){
//     this.patterns = new Map<RegExKey, any>();
//     this.loadPatterns();
//   }

//   // load all patterns in here
//   private loadPatterns(): void {
// tslint:disable-next-line
//     this.patterns.set(RegExKey.EMAIL, /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
//   }

//   getItem( key: RegExKey ) : any {
//     return this.patterns.get(key);
//   }

// }
