/**
 * Facade: contact preference facade
 * Details: getContact preference, change contact preference, meed settings etc.
 * Date: February 10th, 2020
 * Developer: Sudipta <sudipta.ghosh@bs-23.net>
 */

import { Injectable } from '@angular/core';
import { IUASNamedUserLookupResponse, ContactPreference, IMeedPreferenceTag, IBankPreferenceTag } from '@app/core';
import { PreferenceSettingsService } from '@app/core/services/preference-settings.service';
import { ModalService } from '@app/shared';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';

@Injectable()
export class ContactPreferencesFacade {
  isPushNotify = false;
  isEmail = false;
  isBankPushNotify = false;
  isBankEmail = false;
  constructor(
    private preferenceSettingsService: PreferenceSettingsService,
    private modalService: ModalService,
    private analytics: AnalyticsService
  ) {
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
    this.preferenceSettingsService.getContactPreference().subscribe((data: ContactPreference[]) => {
      for (const item of data) {
        if (item.type === IBankPreferenceTag.BankEmail) {
          this.isBankEmail = item.preferenceStatus;
        }
        if (item.type === IBankPreferenceTag.BankPush) {
          this.isBankPushNotify = item.preferenceStatus;
        }
      }
    });
  }

  // it change bank-user email status, it required otp.
  changeBankEmailStatus(): void {
    const apiParms: ContactPreference = {
      preferenceStatus: !this.isBankEmail,
      type: IBankPreferenceTag.BankEmail
    };
    this.preferenceSettingsService.updateContactPreference(apiParms).subscribe(
      data => {},
      err => {
        if (err.status === 403) {
          this.openOtpModal(IBankPreferenceTag.BankEmail);
        }
      }
    );
  }

  // it change bank-user push status, it required otp.
  changeBankPushStatus(): void {
    const apiParms: ContactPreference = {
      preferenceStatus: !this.isBankPushNotify,
      type: IBankPreferenceTag.BankPush
    };
    this.preferenceSettingsService.updateContactPreference(apiParms).subscribe(
      data => {},
      err => {
        if (err.status === 403) {
          this.openOtpModal(IBankPreferenceTag.BankPush);
        }
      }
    );
  }

  // openOtp Modal use for open otp modal.
  /**
   * Issue: GMA-4846
   * Details:  Settings > Contact preference: After entering the
   * correct OTP modal does not dismiss properly.
   * Date: April 08, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */

  openOtpModal(type: string): void {
    this.modalService.openOtpModal(dismissResp => {
      const { data } = dismissResp;
      if (data) {
        if (data.type === IBankPreferenceTag.BankEmail) {
          this.isBankEmail = data.preferenceStatus;
          this.analytics.logEvent(AnalyticsEventTypes.ChangeBankEmailStatus, { email_status: this.isBankEmail });
        } else if (data.type === IBankPreferenceTag.BankPush) {
          this.isBankPushNotify = data.preferenceStatus;
          this.analytics.logEvent(AnalyticsEventTypes.ChangeBankPushNotificationStatus, {
            push_notification_status: this.isBankPushNotify
          });
        }
      } else {
        if (type === IBankPreferenceTag.BankEmail) {
          this.isBankEmail = !this.isBankEmail;
        } else if (IBankPreferenceTag.BankPush) {
          this.isBankPushNotify = !this.isBankPushNotify;
        }
      }
    });
  }
}
