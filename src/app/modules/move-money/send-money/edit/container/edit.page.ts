import { Component, OnInit } from '@angular/core';
import { EditFacade as Facade } from '@app/move-money/send-money/edit/facade/facade';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  initForm(): void {
    this.p2pEditForm = this.formBuilder.group({
      amount: [this.facade.amount, Validators.required],
      message: [this.facade.message, Validators.required]
    });
  }
}
