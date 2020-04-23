import { Component, OnInit } from '@angular/core';
import { EditFacade as Facade } from '@app/move-money/send-money/edit/facade/facade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonValidators } from '@app/core/util/common-validators';
@Component({
  selector: 'edit-page',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss']
})
export class EditPage implements OnInit {
  p2pEditForm: FormGroup;
  constructor(public facade: Facade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  /**
   * Issue:  GMA-4899
   * Details:Removing messgae required and adding minimumTransferAmount validation
   * Date: April 16, 2020
   * Developer: Md.kasuar <md.kausar@brainstation23.com>
   *
   * @memberof EditPage
   */
  initForm(): void {
    this.p2pEditForm = this.formBuilder.group({
      amount: [this.facade.amount, CommonValidators.minimumTransferAmount(1)],
      message: [this.facade.message]
    });
  }
}
