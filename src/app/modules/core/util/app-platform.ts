// errors-handler.ts
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Logger } from '@app/core/services/logger.service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

const log = new Logger('Platform');

enum IosNativeSettings {
  AppInfo = 'application_details',
  OldLocation = 'location', // For old iOS
  Location = 'locations'
}
enum AndroidNativeSettings {
  AppInfo = 'settings',
  Location = 'location'
}
@Injectable()
export class AppPlatform {
  constructor(
    private platform: Platform,
    private diagnostic: Diagnostic,
    private nativeSettings: OpenNativeSettings,
    private camera: Camera
  ) {}
  isCordova(): boolean {
    return this.platform.is('cordova');
  }

  isAndroid(): boolean {
    return this.platform.is('android');
  }

  isIos(): boolean {
    return this.platform.is('ios');
  }

  isDesktop(): boolean {
    return this.platform.is('desktop');
  }

  isMobileWeb(): boolean {
    return this.platform.is('mobileweb');
  }

  getCurrentPlatforms(): string[] {
    return this.platform.platforms();
  }

  ready(): Promise<string> {
    return this.platform.ready();
  }

  currentPlatform(): string {
    const publishedPlatfrom: string[] = [];
    if (this.isAndroid()) {
      publishedPlatfrom.push('android');
    }
    if (this.isIos()) {
      publishedPlatfrom.push('ios');
    }
    if (this.isDesktop()) {
      publishedPlatfrom.push('desktop');
    }
    return this.getCurrentPlatforms().filter(platform => publishedPlatfrom.includes(platform))[0];
  }

  async requestLocationPermission(): Promise<boolean> {
    if ((this.isAndroid() && !this.isMobileWeb()) || (this.isIos() && !this.isMobileWeb())) {
      const authorized = await this.isLocationAuthorized();
      if (!authorized) {
        const status = await this.diagnostic.requestLocationAuthorization();
        switch (status) {
          case this.diagnostic.permissionStatus.NOT_REQUESTED:
            log.info('Permission not requested');
            return Promise.resolve(true);
          case this.diagnostic.permissionStatus.GRANTED:
            log.info('Permission granted');
            return Promise.resolve(true);
          case this.diagnostic.permissionStatus.DENIED_ONCE:
            log.info('Permission denied');
            return await this.requestLocationPermission();
          case this.diagnostic.permissionStatus.DENIED_ALWAYS:
            log.info('Permission permanently denied');
            return Promise.resolve(false);
        }
      } else {
        return Promise.resolve(true);
      }
    }
  }

  async isLocationAuthorized(): Promise<boolean> {
    return await this.diagnostic.isLocationAuthorized();
  }

  async isLocationAvailable(): Promise<boolean> {
    return await this.diagnostic.isLocationAvailable();
  }

  /**
   * Check Device Location is enabled or not
   *
   * @param null
   * @returns true/false { boolean }
   */
  async isLocationEnabled(): Promise<boolean> {
    return await this.diagnostic.isLocationEnabled();
  }

  async goToLocationSettings(): Promise<void> {
    if (this.isIos()) {
      await this.nativeSettings.open(IosNativeSettings.Location);
    } else if (this.isAndroid) {
      await this.nativeSettings.open(AndroidNativeSettings.Location);
    }
  }

  async requestExternalStoragePermission(): Promise<boolean> {
    if ((this.isAndroid() && !this.isMobileWeb()) || (this.isIos() && !this.isMobileWeb())) {
      const authorized = await this.isExternalStorageAuthorized();
      if (!authorized) {
        const status = await this.diagnostic.requestExternalStorageAuthorization();
        switch (status) {
          case this.diagnostic.permissionStatus.NOT_REQUESTED:
            log.info('Permission not requested');
            return Promise.resolve(true);
          case this.diagnostic.permissionStatus.GRANTED:
            log.info('Permission granted');
            return Promise.resolve(true);
          case this.diagnostic.permissionStatus.DENIED_ONCE:
            log.info('Permission denied');
            return await this.requestExternalStoragePermission();
          case this.diagnostic.permissionStatus.DENIED_ALWAYS:
            log.info('Permission permanently denied');
            return Promise.resolve(false);
        }
      } else {
        return Promise.resolve(true);
      }
    }
  }

  isExternalStorageAuthorized(): Promise<boolean> {
    return this.diagnostic.isExternalStorageAuthorized();
  }

  isCameraAuthorized(): Promise<boolean> {
    return this.diagnostic.isCameraAuthorized();
  }

  async requestCameraPermission(): Promise<boolean> {
    if ((this.isAndroid() && !this.isMobileWeb()) || (this.isIos() && !this.isMobileWeb())) {
      const authorized = await this.isCameraAuthorized();
      if (!authorized) {
        const status = await this.diagnostic.requestCameraAuthorization();
        switch (status) {
          case this.diagnostic.permissionStatus.NOT_REQUESTED:
            log.info('Permission not requested');
            return Promise.resolve(true);
          case this.diagnostic.permissionStatus.GRANTED:
            log.info('Permission granted');
            return Promise.resolve(true);
          case this.diagnostic.permissionStatus.DENIED_ONCE:
            log.info('Permission denied');
            return await this.requestCameraPermission();
          case this.diagnostic.permissionStatus.DENIED_ALWAYS:
            log.info('Permission permanently denied');
            return Promise.resolve(false);
        }
      } else {
        return Promise.resolve(true);
      }
    }
  }

  async requestContactPermission(): Promise<boolean> {
    if ((this.isAndroid() && !this.isMobileWeb()) || (this.isIos() && !this.isMobileWeb())) {
      const authorized = await this.isContactAuthorized();
      if (!authorized) {
        const status = await this.diagnostic.requestContactsAuthorization();
        switch (status) {
          case this.diagnostic.permissionStatus.NOT_REQUESTED:
            log.info('Permission not requested');
            return Promise.resolve(true);
          case this.diagnostic.permissionStatus.GRANTED:
            log.info('Permission granted');
            return Promise.resolve(true);
          case this.diagnostic.permissionStatus.DENIED_ONCE:
            log.info('Permission denied');
            return await this.requestContactPermission();
          case this.diagnostic.permissionStatus.DENIED_ALWAYS:
            log.info('Permission permanently denied');
            return Promise.resolve(false);
        }
      } else {
        return Promise.resolve(true);
      }
    }
  }

  isContactAuthorized(): Promise<boolean> {
    return this.diagnostic.isContactsAuthorized();
  }

  captureImage(): Promise<any> {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      targetHeight: 1000,
      targetWidth: 600
    };
    return this.camera.getPicture(options);
  }

  /**
   * This method navigate user to the native iOS, Android device app info or setting page.
   *
   * @param { null }
   * @returns { Promise<void> }
   */
  async openNativeAppSetting(): Promise<void> {
    if (this.isIos) {
      await this.nativeSettings.open(IosNativeSettings.AppInfo);
    } else if (this.isAndroid) {
      await this.nativeSettings.open(AndroidNativeSettings.AppInfo);
    }
  }

  base64toBlob(base64Data: string, contentType: string): Blob {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }
}
