import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DirectDepositFacade } from '../facade';
@Component({
  selector: 'app-direct-deposit',
  templateUrl: './direct-deposit.page.html',
  styleUrls: ['./direct-deposit.page.scss']
})
export class DirectDepositPage implements OnInit {
  depositForm: FormGroup;
  isChecked = false;
  constructor(private formBuilder: FormBuilder, public facade: DirectDepositFacade) {}

  initDepositForm() {
    this.depositForm = this.formBuilder.group({
      businessName: [null, [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    this.initDepositForm();
  }

  emailDepositForm() {
    this.facade.fundDeposit(this.depositForm.controls.businessName.value);
  }
}
