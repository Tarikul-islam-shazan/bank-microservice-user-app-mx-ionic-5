import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import * as semanticVersioning from '@env/semantic-versioning.json';
import { AppPlatform } from '@app/core/util/app-platform';
import { EMPTY } from 'rxjs';
import { ModalService, IMeedModalComponentProps } from '@app/shared/services/modal.service';

enum AppUpdateStatus {
  None = 'None',
  Force = 'Force',
  Soft = 'Soft'
}

interface IUpgradeResponse {
  version?: string;
  updateUrl?: string;
  platform?: string;
  checkUpgrade?: boolean;
  updateStatus?: string;
}

interface IQueryRequest {
  appReleaseDate: string;
  currentVersion: string;
  platform: string;
  deviceOSVersion: string;
  deviceModel: string;
  deviceManufacturer: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppUpgradeService {
  private baseUrl = environment.serviceUrl;
  private updateResponse: IUpgradeResponse;
  private modalService: ModalService;
  constructor(private http: HttpClient, private appPlatform: AppPlatform, private injector: Injector) {}

  /**
   * Issue:  GMA-4462
   * Details:  Add device modal and manufacturer description when checking app upgradation
   * Date: March 18, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */

  /**
   * This function is called everytime whenever a user opens the meed app on a mobile device through the APP_INITIALIZER.
   * This function checks if the meed app is running on a mobile device and based on that makes a
   * server call on whether to show the update modal (force/soft) to the user.
   *
   * @static
   * @param {AppUpgradeService} appUpgradeService
   * @returns
   * @memberof AppUpgradeService
   */
  static factory(appUpgradeService: AppUpgradeService) {
    return () => {
      if (appUpgradeService.appPlatform.isCordova()) {
        // added ModalService through injector cause ModalService is created after the AppUpgradeService.
        appUpgradeService.modalService = appUpgradeService.injector.get(ModalService);
        return appUpgradeService.appPlatform.ready().then(() => {
          return appUpgradeService.checkUpgrade();
        });
      }
      return EMPTY;
    };
  }

  async checkUpgrade(): Promise<void> {
    const queryParameter: IQueryRequest = {
      currentVersion: semanticVersioning.appVersion,
      appReleaseDate: semanticVersioning.releaseDate,
      platform: this.appPlatform.currentPlatform(),
      deviceOSVersion: this.appPlatform.deviceOSVersion,
      deviceModel: this.appPlatform.deviceModel,
      deviceManufacturer: this.appPlatform.deviceManufacturer
    };
    return this.http
      .get<IUpgradeResponse>(`${this.baseUrl}/app-version/upgrade`, {
        params: { ...queryParameter }
      })
      .toPromise()
      .then((updateResponse: IUpgradeResponse) => {
        this.updateResponse = updateResponse;
        this.updateCheckSuccess();
      });
  }
  updateCheckSuccess(): void {
    switch (this.updateResponse.updateStatus) {
      case AppUpdateStatus.Force:
        this.processForceAppUpgrade();
        break;
      case AppUpdateStatus.Soft:
        this.processSoftAppUpgrade();
        break;
    }
  }

  /**
   * This function shows the force upgradation modal to the user. So, as the name applies whenever, this modal is colsed
   * by a user, the user will be directed to the link provided by the server
   *
   * @memberof AppUpgradeService
   */
  async processForceAppUpgrade() {
    const modalComponentContent: IMeedModalComponentProps = {
      componentProps: {
        contents: [
          {
            title: 'app-upgrade.header-title',
            details: ['app-upgrade.force-message']
          }
        ],
        actionButtons: [
          {
            text: 'app-upgrade.button-update-text',
            cssClass: 'white-button',
            handler: () => {
              this.modalService.close();
            }
          }
        ],
        onDidDismiss: () => {
          window.open(this.updateResponse.updateUrl, '_system');
        }
      }
    };
    await this.modalService.openInfoModalComponent(modalComponentContent);
  }

  /**
   * This function shows the soft upgradation modal to the user. Therefore, user has the option to
   * ignore this modal and continue using the application
   *
   * @memberof AppUpgradeService
   */
  async processSoftAppUpgrade() {
    const modalComponentContent: IMeedModalComponentProps = {
      componentProps: {
        contents: [
          {
            title: 'app-upgrade.header-title',
            details: ['app-upgrade.soft-message']
          }
        ],
        actionButtons: [
          {
            text: 'app-upgrade.button-notnow-text',
            cssClass: 'grey-outline-button',
            handler: () => {
              this.modalService.close();
            }
          },
          {
            text: 'app-upgrade.button-update-text',
            cssClass: 'white-button',
            handler: () => {
              window.open(this.updateResponse.updateUrl, '_system');
              this.modalService.close();
            }
          }
        ]
      }
    };
    await this.modalService.openInfoModalComponent(modalComponentContent);
  }
}
