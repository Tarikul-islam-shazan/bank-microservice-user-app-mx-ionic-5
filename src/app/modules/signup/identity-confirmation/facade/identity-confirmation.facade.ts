import { AppPlatform } from '@app/core';
import { DropdownModalComponent, IMeedModalContent, ModalService } from '@app/shared';
import { DropdownOption, ScanIdenittyPictureType } from '@app/signup/models/signup';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class IdentityConfirmationFacade {
  selectedUtility: DropdownOption;
  selfieImage: string;
  utilityBillImage: string;

  scannedSelfieImage: Blob;
  scannedUtilityBillImage: Blob;

  constructor(
    private modalService: ModalService,
    private platformService: AppPlatform,
    private translateService: TranslateService
  ) {}

  /**
   * @summary gets utility options
   *
   * @returns {DropdownOption[]}
   * @memberOf IdentityConfirmationFacade
   */
  getUtilityOptions(): DropdownOption[] {
    const utilityOptions: DropdownOption[] = [
      {
        text: 'Electricity Service Bill',
        value: 'Electricity Service Bill'
      },
      {
        text: 'Water Service Bill',
        value: 'Water Service Bill'
      },
      {
        text: 'Phone Service Bill',
        value: 'Phone Service Bill'
      }
    ];

    return utilityOptions;
  }

  /**
   * @summary translates the given key
   *
   * @param {string} keyToTranslate
   * @returns {string}
   * @memberOf IdentityConfirmationFacade
   */
  getTranlatedValueByKey(keyToTranslate: string): string {
    return this.translateService.instant(keyToTranslate);
  }

  /**
   * @summary opens utility modal
   *
   * @param {DropdownOption[]} options
   * @param {(selectedUtility: DropdownOption) => void} callback
   * @returns {void}
   * @memberOf IdentityConfirmationFacade
   */
  openUtilityModal(options: DropdownOption[], callback: (selectedUtility: DropdownOption) => void): void {
    this.modalService.openModal(DropdownModalComponent, { data: options }, (response: any) => {
      const { data } = response;
      if (data) {
        this.selectedUtility = data;
        this.selectedUtility.text = this.getTranlatedValueByKey(this.selectedUtility.text);
        callback(this.selectedUtility);
      }
    });
  }

  /**
   * @summary opens permission modal
   *
   * @private
   * @returns {Promise<void>}
   * @memberOf IdentityConfirmationFacade
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
   * @summary captures photo
   *
   * @param {ScanIdenittyPictureType} type
   * @param {HTMLInputElement} uploadInputElement
   * @returns {Promise<void>}
   * @memberOf IdentityConfirmationFacade
   */
  async takePhoto(type: ScanIdenittyPictureType, uploadInputElement: HTMLInputElement): Promise<void> {
    if (this.platformService.isCordova()) {
      const cameraPermission = await this.platformService.requestCameraPermission();
      if (cameraPermission) {
        if (this.platformService.isAndroid()) {
          const storagePermission = await this.platformService.requestExternalStoragePermission();
          if (storagePermission) {
            const imageData = await this.platformService.captureImage();
            const base64Image = 'data:image/jpeg;base64,' + imageData;
            this.initImageData(type, base64Image, imageData);
          } else {
            this.permissionInfoModal();
          }
        } else {
          const imageData = await this.platformService.captureImage();
          const base64Image = 'data:image/jpeg;base64,' + imageData;
          this.initImageData(type, base64Image, imageData);
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
   * @summary uploads image
   *
   * @param {ScanIdenittyPictureType} type
   * @param {HTMLInputElement} uploadInputElement
   * @returns {void}
   * @memberOf IdentityConfirmationFacade
   */
  uploadImage(type: ScanIdenittyPictureType, uploadInputElement: HTMLInputElement): void {
    const file = uploadInputElement.files[0],
      reader = new FileReader();

    reader.onloadend = () => {
      const imageData = (reader.result as string).replace(/^data:.+;base64,/, '');
      const base64Image = 'data:image/jpg;base64,' + imageData;
      switch (type) {
        case ScanIdenittyPictureType.Utility:
          this.utilityBillImage = base64Image;
          this.scannedUtilityBillImage = this.platformService.base64toBlob(imageData, 'image/png');
          break;

        case ScanIdenittyPictureType.Selfie:
          this.selfieImage = base64Image;
          this.scannedSelfieImage = this.platformService.base64toBlob(imageData, 'image/png');
          break;
      }
    };
    reader.readAsDataURL(file);
  }

  /**
   * @summary After capturing the image, save those images on variables
   *
   * @private
   * @param {ScanIdenittyPictureType} type
   * @param {string} base64Image
   * @param {string} imageData
   * @returns {void}
   * @memberOf IdentityConfirmationPage
   */
  private initImageData(type: ScanIdenittyPictureType, base64Image: string, imageData: string): void {
    switch (type) {
      case ScanIdenittyPictureType.Utility:
        this.utilityBillImage = base64Image;
        this.scannedUtilityBillImage = this.platformService.base64toBlob(imageData, 'image/png');
        break;

      case ScanIdenittyPictureType.Selfie:
        this.selfieImage = base64Image;
        this.scannedSelfieImage = this.platformService.base64toBlob(imageData, 'image/png');
        break;
    }
  }

  /**
   * @summary This method prepares the parameter to send to api.
   * @summary As there are images, these datas are needed to be sent as form data
   *
   * @returns {FormData} The param object for sending to api
   * @memberOf IdentityConfirmationPage
   */
  getFormData(utilityType: string): FormData {
    const formData = new FormData();
    formData.append('utilityType', utilityType);
    formData.append('utilityImage', this.scannedUtilityBillImage, 'utility.png');
    formData.append('selfieImage', this.scannedSelfieImage, 'selfie.png');

    return formData;
  }

  //   continue(utilityType: string): void {}
}
