import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DocumentImageType, IDocumentRequestData } from '@app/core';
import { IonInput } from '@ionic/angular';
import { noop } from 'rxjs';
import { RequiredDocumentsFacade } from '../facade/change-name-required-documents.facade';
/**
 * Container: Change Required Documents Modal Page
 * Details: Uploading id card images and legal document to update the name and submit with other datas
 */

@Component({
  selector: 'change-name-required-documents',
  templateUrl: './change-name-required-documents.page.html',
  styleUrls: ['./change-name-required-documents.page.scss']
})
export class ChangeNameRequiredDocumentsPage implements OnInit {
  @ViewChild('frontIdImageInput', { static: false }) frontIdImageInput: IonInput;
  @ViewChild('backIdImageInput', { static: false }) backIdImageInput: IonInput;
  @ViewChild('documentImageInput', { static: false }) documentImageInput: IonInput;
  documentImageType = DocumentImageType;
  @Input() data: IDocumentRequestData;

  constructor(public facade: RequiredDocumentsFacade) {}

  ngOnInit() {
    this.facade.initRequestData(this.data);
  }

  /**
   * @summary Called on click event on the image boxes. If web, then takes the element, calls the facade to authorize and capture
   *
   * @async
   * @param {DocumentImageType} type
   * @returns {Promise<void>}
   * @memberOf ChangeNameRequiredDocumentsPage
   */
  async takePhoto(type: DocumentImageType): Promise<void> {
    let imageUploadElement: HTMLInputElement;

    switch (type) {
      case DocumentImageType.FrontImage:
        imageUploadElement = await this.frontIdImageInput.getInputElement();
        break;

      case DocumentImageType.BackImage:
        imageUploadElement = await this.backIdImageInput.getInputElement();
        break;

      case DocumentImageType.DocumentImage:
        imageUploadElement = await this.documentImageInput.getInputElement();
        break;
    }
    this.facade.takePhoto(type, imageUploadElement);
  }

  /**
   * @summary Called on click event on the image boxes if its on web. Calls facade to upload
   *
   * @async
   * @param {DocumentImageType} type
   * @returns {Promise<void>}
   * @memberOf ChangeNameRequiredDocumentsPage
   */
  async uploadImage(type: DocumentImageType): Promise<void> {
    let imageUploadElement: HTMLInputElement;

    switch (type) {
      case DocumentImageType.FrontImage:
        imageUploadElement = await this.frontIdImageInput.getInputElement();
        break;

      case DocumentImageType.BackImage:
        imageUploadElement = await this.backIdImageInput.getInputElement();
        break;

      case DocumentImageType.DocumentImage:
        imageUploadElement = await this.documentImageInput.getInputElement();
        break;
    }
    this.facade.uploadImage(type, imageUploadElement);
  }

  /**
   * @summary Call facade for dismissing the modal and reset facade data
   *
   * @returns {void}
   * @memberOf ChangeNameRequiredDocumentsPage
   */
  dismiss(): void {
    this.facade.dismissModal();
    this.facade.resetFacadeData();
  }

  /**
   * @summary Called on pressing the save button
   *
   * @returns {void}
   * @memberOf ChangeNameRequiredDocumentsPage
   */
  save(): void {
    this.facade.sendOTP(this.facade.getFormData()).subscribe(noop, err => {
      if (err.status === 403) {
        this.facade.openOtpModal();
      }
    });
  }
}
