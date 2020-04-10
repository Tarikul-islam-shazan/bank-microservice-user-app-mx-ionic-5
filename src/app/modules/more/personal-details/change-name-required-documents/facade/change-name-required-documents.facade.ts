import { AppPlatform } from '@app/core/util/app-platform';
import { CustomerService } from '@app/core/services/customer-service.service';
import { DocumentImageType, ICustomer, IDocumentRequestData } from '@app/core';
import { IMeedModalContent, ModalService } from '@app/shared';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PersonalDetailsState } from '@app/more/personal-details/facade/personal-details.state';
/**
 * Container: Change Required Documents Facade
 * Details: Help the container to upload the images of id card and legal document and submitting the data
 */

@Injectable()
export class RequiredDocumentsFacade {
  backIdImage: string;
  documentImage: string;
  frontIdImage: string;
  private customer: ICustomer = {};
  private requestData: IDocumentRequestData;

  constructor(
    private customerService: CustomerService,
    private personalDetailsState: PersonalDetailsState,
    private modalService: ModalService,
    private platformService: AppPlatform
  ) {
    this.getCustomer();
  }

  get requiredDocument(): string {
    return this.requestData.requiredDocument ? this.requestData.requiredDocument : '';
  }

  /**
   * @summary Get customer details when the page loads at the begining
   *
   * @private
   * @returns {Subscription} the customer data that comes from the backend
   * @memberOf RequiredDocumentsFacade
   */
  private getCustomer(): Subscription {
    return this.personalDetailsState.customer$.subscribe((customer: ICustomer) => {
      this.customer = customer;
    });
  }

  /**
   * @summary Initialize the requestData from navParam
   *
   * @param {IDocumentRequestData} data
   * @returns {void}
   * @memberOf RequiredDocumentsFacade
   */
  initRequestData(data: IDocumentRequestData): void {
    this.requestData = data;
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
   * @summary Take the camera permission if not authorized and initialize the process of capturing images
   *
   * @async
   * @param {DocumentImageType} type
   * @param {HTMLInputElement} uploadInputElement
   * @returns {Promise<void>}
   * @memberOf RequiredDocumentsFacade
   */
  /**
   * Issue: GMA-4671
   * Details: Need settings permission modal if the user try to access camera after denied
   * the camera permission first time
   * Date: 12-March-2020
   * Developer: Rahadur Rhaman <rahadur.rahman@brainstation23.com>
   */
  async takePhoto(type: DocumentImageType, uploadInputElement: HTMLInputElement): Promise<void> {
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
   * @summary After capturing the image, save those images on variables
   *
   * @private
   * @param {DocumentImageType} type
   * @param {string} base64Image
   * @param {string} imageData
   * @returns {void}
   * @memberOf RequiredDocumentsFacade
   */
  private initImageData(type: DocumentImageType, base64Image: string, imageData: string): void {
    switch (type) {
      case DocumentImageType.FrontImage:
        this.frontIdImage = base64Image;
        this.requestData.frontIdImage = this.platformService.base64toBlob(imageData, 'image/png');
        break;
      case DocumentImageType.BackImage:
        this.backIdImage = base64Image;
        this.requestData.backIdImage = this.platformService.base64toBlob(imageData, 'image/png');
        break;
      case DocumentImageType.DocumentImage:
        this.documentImage = base64Image;
        this.requestData.documentImage = this.platformService.base64toBlob(imageData, 'image/png');
        break;
    }
  }

  /**
   * @summary Check if all the images are captured or not
   *
   * @returns {boolean} If all the images are there returns true, else returns false
   * @memberOf RequiredDocumentsFacade
   */
  checkIsAllRequiredDocumentsAvailable(): boolean {
    return this.frontIdImage && this.backIdImage && this.documentImage ? true : false;
  }

  /**
   * @summary This method is used to upload images on Web
   *
   * @param {DocumentImageType} type
   * @param {HTMLInputElement} uploadInputElement
   * @returns {void}
   * @memberOf RequiredDocumentsFacade
   *
   * Feature: GMA-4197:  Implementing upload image functionality on Web for name change
   * Date: February 25, 2020
   * @author: M G Muntaqeem <muntaqeem@bs-23.net>
   * Response: Implemented this method for uploading images on Web
   */
  uploadImage(type: DocumentImageType, uploadInputElement: HTMLInputElement): void {
    const file = uploadInputElement.files[0],
      reader = new FileReader();

    reader.onloadend = () => {
      const imageData = (reader.result as string).replace(/^data:.+;base64,/, '');
      const base64Image = 'data:image/jpg;base64,' + imageData;
      switch (type) {
        case DocumentImageType.FrontImage:
          this.frontIdImage = base64Image;
          this.requestData.frontIdImage = this.platformService.base64toBlob(imageData, 'image/png');
          break;
        case DocumentImageType.BackImage:
          this.backIdImage = base64Image;
          this.requestData.backIdImage = this.platformService.base64toBlob(imageData, 'image/png');
          break;
        case DocumentImageType.DocumentImage:
          this.documentImage = base64Image;
          this.requestData.documentImage = this.platformService.base64toBlob(imageData, 'image/png');
          break;
      }
    };
    reader.readAsDataURL(file);
  }

  /**
   * @summary This method prepares the parameter to send to api.
   * @summary As there are images, these datas are needed to be sent as form data
   *
   * @returns {FormData} The param object for sending to api
   * @memberOf RequiredDocumentsFacade
   */
  getFormData(): FormData {
    const formData = new FormData();
    formData.append('oldName', this.requestData.oldName);
    formData.append('salutation', this.requestData.salutation);
    formData.append('firstName', this.requestData.firstName);
    formData.append('middleName', this.requestData.middleName);
    formData.append('lastName', this.requestData.lastName);
    formData.append('dateOfBirth', this.requestData.dateOfBirth);
    formData.append('reason', this.requestData.reason);
    formData.append('requiredDocument', this.requestData.requiredDocument);
    formData.append('email', this.requestData.email);
    formData.append('frontIdImage', this.requestData.frontIdImage, 'id_front.png');
    formData.append('backIdImage', this.requestData.backIdImage, 'id_back.png');
    formData.append('documentImage', this.requestData.documentImage, 'document.png');
    return formData;
  }

  /**
   * @summary Initialize the otp modal
   *
   * @param {*} formData
   * @returns {Observable<ICustomer>}
   * @memberOf RequiredDocumentsFacade
   */
  sendOTP(formData: any): Observable<ICustomer> {
    const documentsData: IDocumentRequestData = formData;
    return this.customerService.updateName(documentsData);
  }

  /**
   * @summary Update the data after successful update of the name
   *
   * @param {ICustomer} _customer
   * @returns {void}
   * @memberOf RequiredDocumentsFacade
   */
  updateCustomer(_customer: ICustomer): void {
    Object.assign(this.customer, _customer);
  }

  /**
   * @summary This method successfully closes the otp modal
   *
   * @returns {void}
   * @memberOf RequiredDocumentsFacade
   */
  openOtpModal(): void {
    this.modalService.openOtpModal(dismissResp => {
      const { data } = dismissResp;
      if (data) {
        this.updateCustomer(data);
        this.resetFacadeData();
        setTimeout(() => {
          this.modalService.close(data);
        }, 200);
      }
    });
  }

  /**
   * @summary Dismiss the modal
   *
   * @returns {void}
   * @memberOf RequiredDocumentsFacade
   */
  dismissModal(): void {
    this.modalService.close();
  }

  /**
   * @summary Reseting the datas of the facade
   *
   * @returns {void}
   * @memberOf RequiredDocumentsFacade
   */
  resetFacadeData(): void {
    this.frontIdImage = '';
    this.backIdImage = '';
    this.documentImage = '';
  }
}
