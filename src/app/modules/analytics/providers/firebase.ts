import { Injector } from '@angular/core';
import { AnalyticsProvider } from '../models/analytics-provider';
import { Logger } from '@app/core/services/logger.service';
import { environment } from '@env/environment';
import * as firebaseWeb from 'firebase/app';
import { FirebaseX as FirebaseNative } from '@ionic-native/firebase-x/ngx';
import { AppPlatform } from '@app/core/util/app-platform';
import { AnalyticsEventTypes, AnalyticsUserProperties } from '@app/analytics/models/analytics-provider';
import 'firebase/analytics';

const logger = new Logger('FirebaseAnalyticsProvider');

/**
 *  Firebase analytics provider.
 *
 * @export
 * @class FirebaseAnalyticsProvider
 * @implements {IAnalyticsProvider}
 */

export class FirebaseAnalyticsProvider implements AnalyticsProvider {
  static injector: Injector;
  private firebaseNative: FirebaseNative;
  private isNative: boolean;
  constructor() {
    const appPlatform = FirebaseAnalyticsProvider.injector.get(AppPlatform);
    this.isNative = appPlatform.isCordova();
    this.initializeApp();
  }

  initializeApp() {
    if (this.isNative) {
      this.firebaseNative = FirebaseAnalyticsProvider.injector.get(FirebaseNative);
    } else {
      firebaseWeb.initializeApp(environment.firebaseConfig);
    }
  }

  /**
   *  Sets the userid, so that user can be tracked
   *
   * @param {string} id
   * @memberof FirebaseAnalyticsProvider
   */
  setUserId(id: string): void {
    if (this.isNative) {
      this.firebaseNative.setUserId(id);
      // Set Crashlytics user identifier
      this.firebaseNative.setCrashlyticsUserId(id);
    } else {
      firebaseWeb.analytics().setUserId(id);
    }
    // Also set member_id as User property, we can not user user_id as user property name
    this.setUserProperty(AnalyticsUserProperties.MemberId, id);
  }

  /**
   * Set User Properties
   *
   * @param {string} name
   * @param {string} value
   * @memberof FirebaseAnalyticsProvider
   */
  setUserProperty(name: string, value: string): void {
    const property = {
      [name]: value
    };
    if (this.isNative) {
      this.firebaseNative.setUserProperty(name, value);
    } else {
      firebaseWeb.analytics().setUserProperties(property);
    }
  }

  /**
   *  Sets the current screen name, so user activity can be associated with a particular screen.
   *
   * @param {string} name
   * @memberof FirebaseAnalyticsProvider
   */
  setCurrentScreenName(name: string): void {
    if (this.isNative) {
      this.firebaseNative.setScreenName(name);
    } else {
      // setCurrentScreenonly for device, we need to use firebase web app default event page_view, it will collect route url also
      this.logEvent(AnalyticsEventTypes.PageView, { page_title: name });
    }
  }

  /**
   * Sets whether analytics collection is enabled for this app.
   *
   * @param {boolean} isEnabled
   * @memberof FirebaseAnalyticsProvider
   */
  setAnalyticsEnabled(isEnabled: boolean): void {
    if (this.isNative) {
      this.firebaseNative.setAnalyticsCollectionEnabled(isEnabled);
    } else {
      firebaseWeb.analytics().setAnalyticsCollectionEnabled(isEnabled);
    }
  }

  /**
   *
   * Sometime we just used this.analytics.logEvent(EVENT_NAME), no event parameter given
   * Firebase native complaing about this, and succes empty object instead of undefined.
   * params default value if not given set to empty
   * @param {*} event
   * @memberof FirebaseAnalyticsProvider
   */
  logEvent(event: any, params: any = {}): void {
    if (this.isNative) {
      this.firebaseNative.logEvent(event, params);
    } else {
      firebaseWeb.analytics().logEvent(event, params);
    }
  }
}
