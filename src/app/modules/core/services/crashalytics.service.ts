import { Injectable } from '@angular/core';
import { FirebaseX as FirebaseNative } from '@ionic-native/firebase-x/ngx';
import { Logger } from './logger.service';
import { AppPlatform } from '../util/app-platform';
import { UIError } from '@app/core/models/error-types';
const logger = new Logger('CrashalyticsService');
@Injectable({
  providedIn: 'root'
})
export class CrashalyticsService {
  canLog = false;
  constructor(private appPlatform: AppPlatform, private firebaseNative: FirebaseNative) {
    logger.info('initialize');
    if (this.appPlatform.isCordova()) {
      logger.info('platform is cordova crashalytics is enabled');
      this.canLog = true;
    } else {
      logger.info('platform is cordova crashalytics is disabled');
    }
  }

  public logError(logMessage: UIError) {
    if (this.canLog) {
      this.firebaseNative.logError(JSON.stringify(logMessage));
    }
  }
}
