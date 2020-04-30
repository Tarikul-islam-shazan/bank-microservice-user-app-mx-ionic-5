import { AppPlatform, SignUpService, StaticDataCategory, StaticDataService, StaticData } from '@app/core';
import { DropdownModalComponent, IMeedModalContent, ModalService } from '@app/shared';
import { DropdownOption } from '@app/signup/models/signup';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
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
    private router: Router,
    private signupService: SignUpService,
    private staticDataService: StaticDataService,
    private translateService: TranslateService
  ) {}

  /**
   * @summary gets utility options
   *
   * @returns {DropdownOption[]}
   * @memberOf IdentityConfirmationFacade
   */
  getUtilityOptions(): Observable<DropdownOption[]> {
    return this.staticDataService
      .get(StaticDataCategory.IdentityConfirmation)
      .pipe(map(staticData => staticData[StaticData.UtilityDocument]));
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
   * @returns {Promise<void>}
   * @memberOf IdentityConfirmationFacade
   */
  async openUtilityModal(
    options: DropdownOption[],
    callback: (selectedUtility: DropdownOption) => void
  ): Promise<void> {
    const componentProps: IMeedModalContent = {
      data: options,
      onDidDismiss: response => {
        const { data } = response;
        if (data) {
          this.selectedUtility = data;
          this.selectedUtility.text = this.getTranlatedValueByKey(this.selectedUtility.text);
          callback(this.selectedUtility);
        }
      }
    };
    await this.modalService.openModal(DropdownModalComponent, componentProps);
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
   * @param {HTMLInputElement} uploadInputElement
   * @returns {Promise<void>}
   * @memberOf IdentityConfirmationFacade
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
            this.initImageData(base64Image, imageData);
          } else {
            this.permissionInfoModal();
          }
        } else {
          const imageData = await this.platformService.captureImage();
          const base64Image = 'data:image/jpeg;base64,' + imageData;
          this.initImageData(base64Image, imageData);
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
   * @param {HTMLInputElement} uploadInputElement
   * @returns {void}
   * @memberOf IdentityConfirmationFacade
   */
  uploadImage(uploadInputElement: HTMLInputElement): void {
    const file = uploadInputElement.files[0],
      reader = new FileReader();

    reader.onloadend = () => {
      const imageData = (reader.result as string).replace(/^data:.+;base64,/, '');
      const base64Image = 'data:image/jpg;base64,' + imageData;
      this.utilityBillImage = base64Image;
      this.scannedUtilityBillImage = this.platformService.base64toBlob(imageData, 'image/png');
    };
    reader.readAsDataURL(file);
  }

  /**
   * @summary After capturing the image, save those images on variables
   *
   * @private
   * @param {string} base64Image
   * @param {string} imageData
   * @returns {void}
   * @memberOf IdentityConfirmationPage
   */
  private initImageData(base64Image: string, imageData: string): void {
    this.utilityBillImage = base64Image;
    this.scannedUtilityBillImage = this.platformService.base64toBlob(imageData, 'image/png');
  }

  /**
   * @summary This method prepares the parameter to send to api.
   * @summary As there are images, these datas are needed to be sent as form data
   *
   * @returns {FormData} The param object for sending to api
   * @memberOf IdentityConfirmationPage
   */
  private getFormData(): FormData {
    const formData = new FormData();
    formData.append('utilityDocument', this.selectedUtility.value);
    formData.append('utilityImage', this.scannedUtilityBillImage, 'utilityImage.png');

    return formData;
  }

  /**
   * @summary continues signup process by sending form data
   *
   * @returns {void}
   * @memberOf IdentityConfirmationFacade
   */
  continue(): void {
    const formData = this.getFormData();
    this.signupService.confirmIdentity(formData).subscribe(() => this.router.navigate(['/signup/terms-conditions']));
  }
}
