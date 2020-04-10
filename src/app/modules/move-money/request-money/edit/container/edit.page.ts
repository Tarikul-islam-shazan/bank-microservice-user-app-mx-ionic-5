import { Component, OnInit } from '@angular/core';
import { EditFacade as Facade } from '@app/move-money/request-money/edit/facade/facade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  initForm(): void {
    this.requestEditForm = this.formBuilder.group({
      amount: [null, Validators.required],
      message: [null, Validators.required]
    });
  }
}
