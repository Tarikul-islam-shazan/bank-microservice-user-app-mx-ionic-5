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
    private readonly analyticsService: AnalyticsService
  ) {
    this.getCustomer();
  }

  /**
   * this is use for fetching the current state of the customer
   *
   * @private
   * @returns {Subscription}
   * @memberof UtilityUploadFacade
   */
  private getCustomer(): Subscription {
    return this.personalDetailsState.customer$.subscribe((customer: ICustomer) => {
      this.customer = customer;
    });
  }

  /**
   * fetching the utility options from the server
   *
   * @returns {Observable<DropdownOption[]>}
   * @memberof UtilityUploadFacade
   */
  getUtilityOptions(): Observable<DropdownOption[]> {
    return this.staticDataService
      .get(StaticDataCategory.IdentityConfirmation)
      .pipe(map(staticData => staticData[StaticData.UtilityDocument]));
  }

  /**
   * opens up the utility modal with the data received form the server
   *
   * @param {DropdownOption[]} options
   * @param {(selectedUtility: DropdownOption) => void} callback
   * @returns {Promise<void>}
   * @memberof UtilityUploadFacade
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

  getTranlatedValueByKey(keyToTranslate: string): string {
    return this.translateService.instant(keyToTranslate);
  }

  /**
   * This method is use for taking pic or uploading pic from web or devices and
   * asking necessary permission for the task
   *
   * @param {HTMLInputElement} uploadInputElement
   * @returns {Promise<void>}
   * @memberof UtilityUploadFacade
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
   * storing the image in local variable for future use
   *
   * @private
   * @param {string} base64Image
   * @param {string} imageData
   * @memberof UtilityUploadFacade
   */
  private initImageData(base64Image: string, imageData: string): void {
    this.utilityBillImage = base64Image;
    this.scannedUtilityBillImage = this.platformService.base64toBlob(imageData, 'image/png');
  }

  /**
   * showing the permission modal
   *
   * @private
   * @returns {Promise<void>}
   * @memberof UtilityUploadFacade
   */
  private async permissionInfoModal(): Promise<void> {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'more-module.personal-details.change-address-modal.permission-info-modal.title',
          details: ['more-module.personal-details.change-address-modal.permission-info-modal.details']
        }
      ],
      actionButtons: [
        {
          text: 'more-module.personal-details.change-address-modal.permission-info-modal.setting-button-text',
          cssClass: 'white-button',
          handler: async () => {
            await this.platformService.openNativeAppSetting();
            await this.modalService.close();
          }
        },
        {
          text: 'more-module.personal-details.change-address-modal.permission-info-modal.cancel-button-text',
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
   * This method is used for showing the uploaded pic in the UI
   *
   * @param {HTMLInputElement} uploadInputElement
   * @memberof UtilityUploadFacade
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

  private getFormData(): FormData {
    const formData = new FormData();
    formData.append('utilityDocument', this.selectedUtility.value);
    formData.append('utilityImage', this.scannedUtilityBillImage, 'utilityImage.png');

    return formData;
  }

  /**
   * This method is use for getting all the change address data and utility bill
   * documents and send them to the server. Also change the customer status depending
   * on the server response
   *
   * @memberof UtilityUploadFacade
   */
  async continue() {
    const formData = this.getFormData();
    const customer: ICustomer = this.changeAddressService.customerData;
    await this.signupService.confirmIdentity(formData).toPromise();
    const data = await this.customerService.updateAddress(customer).toPromise();
    this.customer.addresses = data.addresses;
    this.analyticsService.logEvent(AnalyticsEventTypes.AddressChanged);
    Object.assign(this.memberService.member, data);
    this.addressChangeSuccess();
  }

  async addressChangeSuccess() {
    const componentProps: IMeedModalContent = {
      onDidDismiss: () => {
        this.router.navigate([`/more/personal-details`]);
      }
    };
    await this.modalService.openModal(AddressSuccessModalComponent, componentProps);
  }
}
