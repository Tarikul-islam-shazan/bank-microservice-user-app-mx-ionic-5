import { Injectable } from '@angular/core';
import { AppPlatform } from '@app/core/util/app-platform';
import { IMeedModalContent, ModalService, DropdownModalComponent } from '@app/shared';
import { Observable, Subscription } from 'rxjs';
import { DropdownOption } from '@app/signup/models/signup';
import { StaticDataService, StaticDataCategory, StaticData, SignUpService, ICustomer } from '@app/core';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CustomerService } from '@app/core/services/customer-service.service';
import { ChangeAddressService } from '@app/more/personal-details/change-address/services/change-address.service';
import { PersonalDetailsState } from '@app/more/personal-details/facade/personal-details.state';
import { MemberService } from '@app/core/services/member.service';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { AddressSuccessModalComponent } from '../../components/address-success-modal/address-success-modal.component';
@Injectable()
export class UtilityUploadFacade {
  utilityBillImage: string;
  selectedUtility: DropdownOption;
  scannedUtilityBillImage: Blob;
  customer: ICustomer = {};
  constructor(
    private platformService: AppPlatform,
    private modalService: ModalService,
    private staticDataService: StaticDataService,
    private translateService: TranslateService,
    private signupService: SignUpService,
    private router: Router,
    private customerService: CustomerService,
    private changeAddressService: ChangeAddressService,
    private personalDetailsState: PersonalDetailsState,
    private memberService: MemberService,
    private analyticsService: AnalyticsService
  ) {
    this.getCustomer();
  }

  /**
   * @summary gets customer info
   *
   * @private
   * @returns {Subscription}
   * @memberOf ChangeAddressFacade
   */
  private getCustomer(): Subscription {
    return this.personalDetailsState.customer$.subscribe((customer: ICustomer) => {
      this.customer = customer;
    });
  }

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
   * @summary After capturing the image, save those images on variables
   *
   * @private
   * @param {string} base64Image
   * @param {string} imageData
   * @returns {void}
   *
   */
  private initImageData(base64Image: string, imageData: string): void {
    this.utilityBillImage = base64Image;
    this.scannedUtilityBillImage = this.platformService.base64toBlob(imageData, 'image/png');
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
      this.utilityBillImage = base64Image;
      this.scannedUtilityBillImage = this.platformService.base64toBlob(imageData, 'image/png');
    };
    reader.readAsDataURL(file);
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

  async continue() {
    const formData = this.getFormData();
    const customer: ICustomer = this.changeAddressService.customerData;
    await this.signupService.confirmIdentity(formData).toPromise();
    const data = await this.customerService.updateAddress(customer).toPromise();
    this.customer.addresses = data.addresses;
    // Object.assign(this.customer, data);
    Object.assign(this.memberService.member, data);
    this.transferSuccess();
  }

  // Transfer success, show the success modal.
  // When modal closed we redirect to move money page or scheduled transfer page based on transfer type
  async transferSuccess() {
    const componentProps: IMeedModalContent = {
      onDidDismiss: () => {
        this.router.navigate([`/more/personal-details`]);
      }
    };
    await this.modalService.openModal(AddressSuccessModalComponent, componentProps);
  }
}
