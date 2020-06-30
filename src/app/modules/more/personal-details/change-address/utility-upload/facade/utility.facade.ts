import { Injectable } from '@angular/core';
import { AppPlatform } from '@app/core/util/app-platform';
import { IMeedModalContent, ModalService } from '@app/shared';

@Injectable()
export class UtilityUploadFacade {
  documentImage: string;

  constructor(private platformService: AppPlatform, private modalService: ModalService) {}

  /**
   * @summary Take the camera permission if not authorized and initialize the process of capturing images
   *
   * @async
   * @param {HTMLInputElement} uploadInputElement
   * @returns {Promise<void>}
   * @memberOf RequiredDocumentsFacade
   */
  async takePhoto(uploadInputElement: HTMLInputElement): Promise<void> {
    if (this.platformService.isCordova()) {
      const cameraPermission = await this.platformService.requestCameraPermission();
      if (cameraPermission) {
        if (this.platformService.isAndroid()) {
          const storagePermission = await this.platformService.requestExternalStoragePermission();
          if (storagePermission) {
            const imageData = await this.platformService.captureImage();
            const base64Image = 'data:image/jpeg;base64,' + imageData;
            this.documentImage = base64Image;
          } else {
            this.permissionInfoModal();
          }
        } else {
          const imageData = await this.platformService.captureImage();
          const base64Image = 'data:image/jpeg;base64,' + imageData;
          this.documentImage = base64Image;
        }
      } else {
        // Show Permission Info Modal
        this.permissionInfoModal();
      }
    } else {
      uploadInputElement.click();
    }
  }

  /**
   * @summary his method will show Info modal if user disable Camera and Storage permission
   *
   * @private
   * @returns {Promise<void>}
   * @memberOf RequiredDocumentsFacade
   */
  private async permissionInfoModal(): Promise<void> {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'more-module.change-name-required-documents.permission-info-modal.title',
          details: ['more-module.change-name-required-documents.permission-info-modal.details']
        }
      ],
      actionButtons: [
        {
          text: 'more-module.change-name-required-documents.permission-info-modal.setting-button-text',
          cssClass: 'white-button',
          handler: async () => {
            await this.platformService.openNativeAppSetting();
            await this.modalService.close();
          }
        },
        {
          text: 'more-module.change-name-required-documents.permission-info-modal.cancel-button-text',
          cssClass: 'grey-outline-button',
          handler: async () => {
            await this.modalService.close();
          }
        }
      ]
    };

    await this.modalService.openInfoModalComponent({ componentProps });
  }

  /**
   * @summary This method is used to upload images on Web
   *
   * @param {DocumentImageType} type
   * @param {HTMLInputElement} uploadInputElement
   * @returns {void}
   * @memberOf RequiredDocumentsFacade
   */
  uploadImage(uploadInputElement: HTMLInputElement): void {
    const file = uploadInputElement.files[0],
      reader = new FileReader();

    reader.onloadend = () => {
      const imageData = (reader.result as string).replace(/^data:.+;base64,/, '');
      const base64Image = 'data:image/jpg;base64,' + imageData;
      this.documentImage = base64Image;
    };
    reader.readAsDataURL(file);
  }
}
