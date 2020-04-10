import { Injectable } from '@angular/core';
import { AppPlatform } from '@app/core/util/app-platform';
import { environment } from '@env/environment';
import { ErrorService } from '@app/core/services/error.service';
import { Logger } from '@app/core/services/logger.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {
  IUASRegEmail,
  IUASUpdateEmail,
  IUASNameLookupResponse,
  IUASNameLookupRequest,
  IUASCommonResponse,
  IUASAssociateEmailToNamedUserId,
  IUASAddInitialTags,
  ChannelTypes
} from '@app/core/models/urban-airship';
import { IMember } from '@app/core/models/dto/member';
import { SettingsService } from '@app/core/services/settings.service';
import momentTimezone from 'moment-timezone';
import { MemberService } from '@app/core/services/member.service';

const log = new Logger('UrbanAirshipService');
declare var UAirship: any;

@Injectable({
  providedIn: 'root'
})
export class UrbanAirshipService {
  private baseUrl = `${environment.serviceUrl}/uas`;
  constructor(
    private appPlatform: AppPlatform,
    private errorService: ErrorService,
    private http: HttpClient,
    private memberService: MemberService,
    private settingsService: SettingsService
  ) {
    this.appPlatform.ready().then(() => {
      this.initialize();
    });
  }
  async initialize() {
    if (this.isCordova) {
      await this.takeOff();
      await this.setAndroidNotificationConfig();
      await this.setPresentationOptions();
      await this.isAppNotificationsEnabled();
      this.initiateUrbanAirshipEventListeners();
    }
  }

  isAppNotificationsEnabled(): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      UAirship.isAppNotificationsEnabled(
        success => {
          log.info('isAppNotificationsEnabled success', success);
          resolve(success);
        },
        error => {
          log.info('isAppNotificationsEnabled error', error);
          this.errorService.sendError(error);
          reject(error);
        }
      );
    });
  }

  initiateUrbanAirshipEventListeners(): void {
    document.addEventListener(
      'urbanairship.registration',
      data => {
        log.info('notification opt in', data);
      },
      false
    );

    document.addEventListener(
      'urbanairship.notification_opt_in_status',
      (data: any) => {
        log.info('notification opt in', data);
      },
      false
    );
    document.addEventListener(
      'urbanairship.push',
      data => {
        log.info('notification opt in', data);
      },
      false
    );
    document.addEventListener(
      'urbanairship.show_inbox',
      data => {
        log.info('notification opt in', data);
      },
      false
    );
    document.addEventListener(
      'urbanairship.inbox_updated',
      data => {
        log.info('notification opt in', data);
      },
      false
    );
  }

  takeOff(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      UAirship.takeOff(
        {
          production: {
            appKey: environment.urbanAirship.appKey,
            appSecret: environment.urbanAirship.appSecret
          },
          development: {
            appKey: environment.urbanAirship.appKey,
            appSecret: environment.urbanAirship.appSecret
          },
          site: environment.urbanAirship.site
        },
        success => {
          resolve(success);
        },
        error => {
          this.errorService.sendError(error);
          reject(error);
        }
      );
    });
  }

  setNamedUser(namedUser: string): Promise<string> {
    if (this.isCordova) {
      return new Promise<string>((resolve, reject) => {
        UAirship.setNamedUser(
          namedUser,
          success => {
            resolve(success);
          },
          error => {
            this.errorService.sendError(error);
            reject(error);
          }
        );
      });
    }
  }

  setAndroidNotificationConfig(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      UAirship.setAndroidNotificationConfig(
        {
          icon: 'ic_notification',
          largeIcon: 'ic_notification_large',
          accentColor: '#FF0000'
        },
        success => {
          resolve(success);
        },
        error => {
          this.errorService.sendError(error);
          reject(error);
        }
      );
    });
  }

  setPresentationOptions(): Promise<boolean> {
    const iOSPresentationOptions =
      // tslint:disable-next-line: no-bitwise
      UAirship.presentationOptions.sound | UAirship.presentationOptions.alert | UAirship.presentationOptions.badge;
    return new Promise<boolean>((resolve, reject) => {
      UAirship.setPresentationOptions(
        iOSPresentationOptions,
        success => {
          resolve(success);
        },
        error => {
          this.errorService.sendError(error);
          reject(error);
        }
      );
    });
  }

  async setUserNotificationsEnabled(enable: boolean): Promise<string> {
    if (this.isCordova) {
      return new Promise<string>((resolve, reject) => {
        UAirship.setUserNotificationsEnabled(
          enable,
          success => {
            log.info('setUserNotificationsEnabled success', success);
            resolve(success);
          },
          error => {
            log.error('setUserNotificationsEnabled error', error);
            this.errorService.sendError(error);
            reject(error);
          }
        );
      });
    }
  }

  get member(): IMember {
    return this.memberService.getCachedMember();
  }

  get isCordova(): boolean {
    return this.appPlatform.isCordova();
  }

  associateEmailToNamedUserId(requestBody: IUASAssociateEmailToNamedUserId): Observable<IUASCommonResponse> {
    return this.http.post<IUASCommonResponse>(`${this.baseUrl}/named-user`, requestBody);
  }

  addInitialTags(): void {
    const requestBody = {
      namedUser: this.member.customerId,
      banks: [this.settingsService.getSettings().userSettings.bankIdentifier]
    } as IUASAddInitialTags;
    this.http.post<IUASCommonResponse>(`${this.baseUrl}/named-user/initial-tags`, requestBody).subscribe();
  }

  getNamedUserLookup(queryParameters: IUASNameLookupRequest): Observable<IUASNameLookupResponse> {
    const httpParams: any = queryParameters;
    return this.http.get<IUASNameLookupResponse>(`${this.baseUrl}/named-user`, {
      params: httpParams
    });
  }

  registerEmailChannel(): void {
    if (this.isCordova) {
      const requestBody = {
        channel: {
          type: ChannelTypes.Email,
          address: this.member.email,
          timezone: momentTimezone.tz.guess(),
          locale_country: this.settingsService.getCurrentLocale().country,
          locale_language: this.settingsService.getCurrentLocale().language
        } as IUASRegEmail
      };
      this.http
        .post<IUASCommonResponse>(`${this.baseUrl}/email-channel`, requestBody)
        .subscribe((response: IUASCommonResponse) => {
          setTimeout(() => {
            this.associateEmailToNamedUserId({
              channel_id: response.channel_id,
              named_user_id: this.member._id
            }).subscribe(respose => {
              this.setNamedUser(this.member._id);
            });
          }, 1000);
        });
    }
  }

  updateEmailChannel(): void {
    if (this.isCordova) {
      this.getNamedUserLookup({
        namedUser: this.member._id
      }).subscribe(nameLookupResponse => {
        const requestBody = {
          channel: {
            type: ChannelTypes.Email,
            channelID: nameLookupResponse.channelId,
            address: this.member.email,
            commercial_opted_in: momentTimezone()
              .utc()
              .add(-5, 'seconds')
              .format('YYYY-MM-DDTHH:mm:ss')
          } as IUASUpdateEmail
        };
        this.http.put<IUASCommonResponse>(`${this.baseUrl}/email-channel`, requestBody).subscribe(response => {
          this.associateEmailToNamedUserId({
            channel_id: response.channel_id,
            named_user_id: this.member.customerId
          }).subscribe(respose => {
            this.setNamedUser(this.member.customerId);
            this.addInitialTags();
          });
        });
      });
    }
  }
}
