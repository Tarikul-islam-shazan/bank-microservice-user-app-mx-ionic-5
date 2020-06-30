import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityUploadFacade } from '../facade/utility.facade';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'mbc-utility-upload',
  templateUrl: './utility-upload.page.html',
  styleUrls: ['./utility-upload.page.scss']
})
export class UtilityUploadPage implements OnInit {
  @ViewChild('documentImageInput', { static: false }) documentImageInput: IonInput;
  constructor(private router: Router, public facade: UtilityUploadFacade) {}

  ngOnInit() {}

  dismiss() {
    this.router.navigate([`/more/personal-details/change-address`]);
  }

  async takePhoto(): Promise<void> {
    let imageUploadElement: HTMLInputElement;
    imageUploadElement = await this.documentImageInput.getInputElement();
    this.facade.takePhoto(imageUploadElement);
  }

  /**
   * @summary Called on click event on the image boxes if its on web. Calls facade to upload
   *
   * @async
   * @param {DocumentImageType} type
   * @returns {Promise<void>}
   * @memberOf ChangeNameRequiredDocumentsPage
   */
  async uploadImage(): Promise<void> {
    let imageUploadElement: HTMLInputElement;
    imageUploadElement = await this.documentImageInput.getInputElement();
    this.facade.uploadImage(imageUploadElement);
  }
}
