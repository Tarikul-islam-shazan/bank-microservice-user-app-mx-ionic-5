import { Injectable } from '@angular/core';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
import { ErrorService } from '@app/core/services/error.service';
import { LoginRequest } from '@app/login/models/login';
import { AppPlatform } from '@app/core/util/app-platform';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

/**
 * Android = biometric,
 * iOS = face, finger
 */
enum AvailableBiometricType {
  Biometric = 'biometric',
  Face = 'face',
  Finger = 'finger'
}
enum SecureStorageObjectKey {
  Username = 'username',
  Password = 'password'
}

/**
 * iOS = Success
 * Android = biometric_success
 */
enum AuthenticateResponse {
  Success = 'Success',
  BiometricSuccess = 'biometric_success'
}

@Injectable({
  providedIn: 'root'
})
export class BiometricAuthenticationService {
  fingerprintOptions: FingerprintOptions;
  secureStorageObject: SecureStorageObject;
  biometricAvailable = new BehaviorSubject<boolean>(false);
  _biometricAvailable$ = this.biometricAvailable.asObservable();
  constructor(
    private fingerprintAIO: FingerprintAIO,
    private errorService: ErrorService,
    private secureStorage: SecureStorage,
    private appPlatform: AppPlatform,
    private platform: Platform,
    private translateService: TranslateService
  ) {
    this.fingerprintOptions = {
      title: this.translateService.instant('biometric-authentication-service.permission-request.title'),
      description: this.translateService.instant('biometric-authentication-service.permission-request.description')
    };
    this.initialize();
  }

  get biometricAvailable$(): Observable<boolean> {
    return this._biometricAvailable$;
  }

  /**
   * @method {getBiometricIsAvailable} reture last value of biometricAvailable subject
   *
   * @returns {boolean}
   * @memberof BiometricAuthenticationService
   */
  getBiometricIsAvailable(): boolean {
    return this.biometricAvailable.getValue();
  }
  updateBiometricAvailable(isAvailable: boolean): void {
    this.biometricAvailable.next(isAvailable);
  }

  initialize(): void {
    this.platform.ready().then(async () => {
      if (this.appPlatform.isCordova()) {
        this.secureStorage.create('meed_store').then((storage: SecureStorageObject) => {
          this.secureStorageObject = storage;
        });
      }
      await this.isAvailable();
    });
  }

  /**
   * Issue: Fix/GMA-4422: Android Face ID checkbox remains always disabled.
   * Date: 12-02-2020
   * Developer: Rahadur Rahman <rahadur.rahman@brainstation23.com>
   *
   * On Android FingerprintAIO plugin return "biometric" as a biometric Type.
   * Now this method only enabled Face ID checkbox if current devices is a iOS or Android
   * and it's has fingerprint or Face ID sensor
   */
  async isAvailable(): Promise<void> {
    if (this.platform.is('cordova')) {
      try {
        const biometricType = await this.fingerprintAIO.isAvailable();

        if (
          biometricType === AvailableBiometricType.Biometric ||
          biometricType === AvailableBiometricType.Face ||
          biometricType === AvailableBiometricType.Finger
        ) {
          this.updateBiometricAvailable(true);
        }
      } catch (error) {}
    } else {
      this.updateBiometricAvailable(false);
    }
  }

  async saveCredentialInSecureStorage(loginRequest: LoginRequest): Promise<void> {
    if (this.appPlatform.isCordova()) {
      try {
        await this.secureStorageObject.set(SecureStorageObjectKey.Username, loginRequest.username);
        await this.secureStorageObject.set(SecureStorageObjectKey.Password, loginRequest.password);
      } catch (error) {
        this.errorService.sendError(error);
      }
    }
  }

  async getUsernameAndPassword(): Promise<LoginRequest> {
    if (this.appPlatform.isCordova()) {
      try {
        const username = await this.secureStorageObject.get(SecureStorageObjectKey.Username);
        const password = await this.secureStorageObject.get(SecureStorageObjectKey.Password);
        const response: LoginRequest = {
          username,
          password
        } as LoginRequest;
        return response;
      } catch (error) {
        this.errorService.sendError(error);
      }
    }
  }

  /**
   * Issue: Fix/GMA-4426: Touch ID not working in Android devices.
   * Date: 13-02-2020
   * Developer: Rahadur Rahman <rahadur.rahman@brainstation23.com>
   *
   * On Android FingerprintAIO plugin return "biometric_success" as fingerprint success result.
   * and this method will check that current user biometric is valid or not.
   * If it's a valid fingerprint or Face Id it will return current user login credential.
   *
   * @param null
   * @returns Promise<LoginRequest>
   */
  async authenticateBiometric(): Promise<LoginRequest> {
    try {
      const authenticate = await this.fingerprintAIO.show(this.fingerprintOptions);
      if (authenticate === AuthenticateResponse.Success || authenticate === AuthenticateResponse.BiometricSuccess) {
        const { username, password } = await this.getUsernameAndPassword();
        return { username, password } as LoginRequest;
      }
    } catch (error) {
      this.errorService.sendError(error);
    }
  }
}
