/**
 * Share service: Shared modal serive
 * Details: shared common modal service to manage modal component, events, data, methods
 * Date: January 30, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */
import { Injectable, Type } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { InfoModalComponent } from '@app/core/components/info-modal';
import { MeedErrorResponse } from '@app/core/models/error-types';
import { ComponentRef } from '@ionic/core';
import { TranslateService } from '@ngx-translate/core';
import { OtpVerificationModalPage } from '../components/otp-verification-modal/container';
import { IMeedModalContent, IMeedModalComponentProps } from '@app/shared/models';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalCtrl: ModalController, private translate: TranslateService) {}

  /**
   * Show api network error modal message
   * @param {MeedErrorResponse} errorResponse
   * @memberof ModalService
   */
  /*
   * Ticket: GMA-4451
   * Problem: Signup: "unknown" error showing.
   * Details: Adding ok button in infoError modal and showing email not valid message
   * Date: February 19, 2020
   * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
   */
  async showInfoErrorModal(errorResponse: MeedErrorResponse, compProps?: IMeedModalContent): Promise<void> {
    let componentProps: IMeedModalContent = compProps;
    if (!compProps) {
      componentProps = {
        contents: [
          {
            title: `error-message-module.error-title`,
            details: [`error-message-module.code-${errorResponse.code}`]
          }
        ],
        actionButtons: [
          {
            text: 'error-message-module.ok-button',
            cssClass: 'white-button',
            handler: event => {
              this.close();
            }
          }
        ]
      };
    }
    this.openInfoModalComponent({ componentProps });
  }

  /**
   * Show dynamic modal based on modal component
   * @param {Type<any>} ComponentClass
   * @param {IMeedModalContent} [modalContent]
   * @param {*} [onDidDismiss]
   * @memberof ModalService
   */
  /* Usage:
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'title',
          details: ['details1','details2'],
          values: { key: value }
        }
      ],
      actionButtons: [
        {
          text: 'text',
          cssClass: 'white-button',
          handler: (event) => {}
        }
      ],
      onDidDismiss: (data) => {}
    };
    openModal(modalComponent, componentProps, onDidDismiss: callback);
  */
  async openModal(ComponentClass: Type<any>, modalContent?: IMeedModalContent, onDidDismiss?: any): Promise<void> {
    const cssClass = this.getCssClass(ComponentClass, modalContent);
    const modal = await this.modalCtrl.create({
      component: ComponentClass as ComponentRef,
      cssClass,
      backdropDismiss: false,
      componentProps: modalContent
    });
    await modal.present();
    modal.onDidDismiss().then(data => {
      if (onDidDismiss) {
        onDidDismiss(data);
      }
      if (modalContent) {
        if (modalContent.onDidDismiss) {
          modalContent.onDidDismiss(data);
        }
      }
    });
  }

  /**
   * we are using InfoModalComponent for showing all type of app info, error, message modal
   * as a half modal [dynamic height based on content], presented from bottom of the screen
   * Feature wanted:
   * sometime we need to use InfoModalComponent as a fullScreen modal view.
   * Or other custom modal as a half modal
   * Solution: we added an optional property for modalContent as fullScreen,
   * fullScreen: boolean: if true we added full screen class
   * @Caution
   * This is a fallback scenario function for modalService open modal view style.
   * In future we need to strictly mention fullScreen [true/false] in modalContent.
   * So we can remove this function
   * @param {ComponentRef} ComponentClass
   * @param {IMeedModalContent} modalContent
   * @returns {string}
   * @memberof ModalService
   */
  getCssClass(ComponentClass: ComponentRef, modalContent: IMeedModalContent): string {
    if (!modalContent || modalContent.fullScreen === undefined) {
      if (ComponentClass === InfoModalComponent) {
        return 'modal-auto-height';
      } else {
        return 'full-modal';
      }
    } else {
      if (modalContent.fullScreen || (ComponentClass === InfoModalComponent && modalContent.fullScreen)) {
        return 'full-modal';
      } else if (ComponentClass === InfoModalComponent) {
        return 'modal-auto-height';
      } else {
        return 'modal-auto-height';
      }
    }
  }

  /**
   * Show common info modal [half modal], with modal contents, buttons events, modal events
   * @param {IMeedModalComponentProps} modalComponentProps
   * @memberof ModalService
   */
  /* Usage:
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'title',
          details: ['details1','details2'],
          values: { key: value }
        }
      ],
      actionButtons: [
        {
          text: 'text',
          cssClass: 'white-button',
          handler: (event) => {}
        }
      ],
      onDidDismiss: (data) => {}
    };
    openInfoModalComponent({componentProps});
  */
  async openInfoModalComponent(modalComponentProps: IMeedModalComponentProps) {
    await this.openModal(InfoModalComponent, modalComponentProps.componentProps);
  }

  /**
   * open otp modal component with modal on Dismiss callback
   * @param {*} [onDidDismiss]
   * @memberof ModalService
   */
  async openOtpModal(onDidDismiss?: any): Promise<void> {
    const componentProps: IMeedModalContent = {
      onDidDismiss: data => {}
    };
    await this.openModal(OtpVerificationModalPage, componentProps, onDidDismiss);
  }

  /**
   * Close opened modal
   * @memberof ModalService
   */
  async close(params?: any): Promise<boolean> {
    // There is a need to pass an optional params, that's why added one
    if (params) {
      return this.modalCtrl.dismiss(params);
    }
    await this.modalCtrl.dismiss();
  }
}

// Export modal service interface
export * from '@app/shared/models/modal';
