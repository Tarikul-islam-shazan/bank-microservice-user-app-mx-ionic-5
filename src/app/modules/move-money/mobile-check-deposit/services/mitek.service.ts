/**
 * Service: Mitek Service
 * Details: Checks image preview did not showing problem is fixed and resetting form when user enter again.
 * Date: February 12,2020
 * Developer: Md.Kausar <md.kausar@brainstation23.com>
 */
import { Injectable } from '@angular/core';
import { AppPlatform } from '@app/core/util/app-platform';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { ErrorService } from '@app/core/services/error.service';
declare var cordova: any;
export enum ChequeSide {
  Front = 'front',
  Back = 'back',
  CheckFront = 'CheckFront',
  CheckBack = 'CheckBack'
}
export interface IChequeImage {
  front: string;
  back: string;
}
@Injectable()
export class MitekService {
  chequeImage: IChequeImage = {} as IChequeImage;
  constructor(private appPlatform: AppPlatform, private diagnostic: Diagnostic, private errorService: ErrorService) {}
  async startMiSnapCaptureCheque(chequeSide: ChequeSide): Promise<void> {
    if (this.appPlatform.isIos()) {
      let side = chequeSide;
      side = side === ChequeSide.Front ? ChequeSide.CheckFront : ChequeSide.CheckBack;
      await this.startMiSnapPlugin(
        successImgbase64 => {
          if (successImgbase64.EncodedImage) {
            if (chequeSide === ChequeSide.Front) {
              this.chequeImage.front = successImgbase64.EncodedImage;
            } else {
              this.chequeImage.back = successImgbase64.EncodedImage;
            }
          }
        },
        failed => {
          this.errorService.sendError(failed);
        },
        'MiSnapPlugin',
        'cordovaCallMiSnap',
        side
      );
    }
    if (this.appPlatform.isAndroid()) {
      const side = chequeSide;
      await this.startMiSnapPlugin(
        successImgbase64 => {
          if (side === ChequeSide.Front) {
            this.chequeImage.front = successImgbase64;
          } else {
            this.chequeImage.back = successImgbase64;
          }
        },
        failed => {
          this.errorService.sendError(failed);
        },
        'MiSnapCordovaPlugin',
        'runMiSnap',
        side
      );
    }
  }

  async startMiSnapPlugin(success, failed, className: string, methodName: string, side: ChequeSide): Promise<void> {
    if (this.appPlatform.isIos()) {
      this.diagnostic
        .getCameraAuthorizationStatus()
        .then(status => {
          if (status === this.diagnostic.permissionStatus.NOT_REQUESTED) {
            this.diagnostic
              .requestCameraAuthorization()
              .then(permission => {
                if (permission === this.diagnostic.permissionStatus.GRANTED) {
                  cordova.exec(
                    data => {
                      success(data);
                    },
                    err => {
                      failed(err);
                    },
                    className,
                    methodName,
                    [side]
                  );
                }
              })
              .catch(error => {
                failed(error);
              });
          } else if (
            status === this.diagnostic.permissionStatus.GRANTED ||
            status === this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE
          ) {
            cordova.exec(
              data => {
                success(data);
              },
              err => {
                failed(err);
              },
              className,
              methodName,
              [side]
            );
          } else {
          }
        })
        .catch(error => {
          failed(error);
        });
    } else {
      cordova.exec(
        data => {
          success(data);
        },
        err => {
          failed(err);
        },
        className,
        methodName,
        [side]
      );
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

  /**
   * Resetting Check images as empty .
   * @memberof MitekService
   */
  resetCheckImage(): void {
    this.chequeImage = {} as IChequeImage;
  }
}
