/**
 * Facade: contact preference facade
 * Details: getContact preference, change contact preference, meed settings etc.
 * Date: February 10th, 2020
 * Developer: Sudipta <sudipta.ghosh@bs-23.net>
 */

import { Injectable } from '@angular/core';
import {
  IUASNamedUserLookupResponse,
  ContactPreference,
  IMeedPreferenceTag,
  Status,
  ContactType,
  ContactPreferenceRequest
} from '@app/core';
import { PreferenceSettingsService } from '@app/core/services/preference-settings.service';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';

@Injectable()
export class ContactPreferencesFacade {
  isPushNotify = false;
  isEmail = false;
  isBankPushNotify = false;
  isBankEmail = false;
  constructor(private preferenceSettingsService: PreferenceSettingsService, private analytics: AnalyticsService) {
    this.getNameduser();
    this.getContactPreferences();
  }

  getNameduser(): void {
    this.preferenceSettingsService.getNamedUser().subscribe((data: IUASNamedUserLookupResponse) => {
      if (data.tags) {
        if (data.tags.includes(IMeedPreferenceTag.MeedPush)) {
          this.isPushNotify = true;
        }
        if (data.tags.includes(IMeedPreferenceTag.MeedEmail)) {
          this.isEmail = true;
        }
      }
    });
  }

  changeMeedEmailStatus(): void {
    if (this.isEmail) {
      this.preferenceSettingsService.deleteNamedUserTag(IMeedPreferenceTag.MeedEmail).subscribe(data => {
        this.isEmail = false;
        this.analytics.logEvent(AnalyticsEventTypes.ChangeMeedEmailStatus, { email_status: this.isEmail });
      });
    } else {
      this.preferenceSettingsService.addNamedUserTag(IMeedPreferenceTag.MeedEmail).subscribe(data => {
        this.isEmail = true;
        this.analytics.logEvent(AnalyticsEventTypes.ChangeMeedEmailStatus, { email_status: this.isEmail });
      });
    }
  }

  changeMeedPushStatus(): void {
    if (this.isPushNotify) {
      this.preferenceSettingsService.deleteNamedUserTag(IMeedPreferenceTag.MeedPush).subscribe(data => {
        this.isPushNotify = false;
        this.analytics.logEvent(AnalyticsEventTypes.ChangeMeedPushNotificationStatus, {
          push_notification_status: this.isPushNotify
        });
      });
    } else {
      this.preferenceSettingsService.addNamedUserTag(IMeedPreferenceTag.MeedPush).subscribe(data => {
        this.isPushNotify = true;
        this.analytics.logEvent(AnalyticsEventTypes.ChangeMeedPushNotificationStatus, {
          push_notification_status: this.isPushNotify
        });
      });
    }
  }

  getContactPreferences(): void {
    this.preferenceSettingsService.getContactPreference().subscribe((contactPreference: ContactPreference) => {
      this.isBankEmail = contactPreference.email === Status.Active;
      this.isBankPushNotify = contactPreference.push === Status.Active;
    });
  }

  // it change bank-user email status, it required otp.
  changeBankEmailStatus(): void {
    const apiParms: ContactPreferenceRequest = {
      type: ContactType.Email,
      status: this.isBankEmail === true ? Status.Inactive : Status.Active
    };
    this.preferenceSettingsService.updateContactPreference(apiParms).subscribe(data => {
      this.analytics.logEvent(AnalyticsEventTypes.ChangeBankEmailStatus, { email_status: this.isBankEmail });
    });
  }

  // it change bank-user push status, it required otp.
  changeBankPushStatus(): void {
    const apiParms: ContactPreferenceRequest = {
      type: ContactType.Push,
      status: this.isBankPushNotify === true ? Status.Inactive : Status.Active
    };
    this.preferenceSettingsService.updateContactPreference(apiParms).subscribe(data => {
      this.analytics.logEvent(AnalyticsEventTypes.ChangeBankPushNotificationStatus, {
        push_notification_status: this.isBankPushNotify
      });
    });
  }
}
