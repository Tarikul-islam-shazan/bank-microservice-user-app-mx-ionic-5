import { Component, OnInit } from '@angular/core';
import { EditFacade as Facade } from '@app/move-money/request-money/edit/facade/facade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonValidators } from '@app/core/util/common-validators';
@Component({
  selector: 'edit-page',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss']
})
export class EditPage implements OnInit {
  requestEditForm: FormGroup;
  constructor(public facade: Facade, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  /**
   * Issue:  GMA-4903
   * Details:Removing messgae required and adding minimumTransferAmount validation
   * Date: April 16, 2020
   * Developer: Md.kasuar <md.kausar@brainstation23.com>
   * @memberof EditPage
   */
  initForm(): void {
    this.requestEditForm = this.formBuilder.group({
      amount: [null, CommonValidators.minimumTransferAmount(1)],
      message: [null]
    });
  }
}
