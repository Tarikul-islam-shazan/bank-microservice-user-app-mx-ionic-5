import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DirectDepositCompleteFacaed } from '../facade';
@Component({
  selector: 'app-direct-deposit-complete',
  templateUrl: './direct-deposit-complete.page.html',
  styleUrls: ['./direct-deposit-complete.page.scss']
})
export class DirectDepositCompletePage implements OnInit {
  constructor(private router: Router, private facade: DirectDepositCompleteFacaed) {}

  ngOnInit() {}

  exploreApp() {
    this.facade.exploreApp();
  }
}
