// angular
import { Injectable } from '@angular/core';
import { Storage as IonicStorage } from '@ionic/storage';
// module
import { IStorage, StorageKey } from '@app/core/models/storage';

@Injectable()
export class StorageService implements IStorage {
  constructor(private ionicStroage: IonicStorage) {}
  async setItem(key: StorageKey, value: any): Promise<void> {
    await this.ionicStroage.set(key, value === null ? null : value);
  }

  async getItem(key: StorageKey): Promise<any> {
    const value = await this.ionicStroage.get(key);
    return value === null ? null : value;
  }

  async removeItem(key: StorageKey): Promise<void> {
    await this.ionicStroage.remove(key);
  }
}
