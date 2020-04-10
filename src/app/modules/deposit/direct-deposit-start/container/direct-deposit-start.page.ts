import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-direct-deposit-start',
  templateUrl: './direct-deposit-start.page.html',
  styleUrls: ['./direct-deposit-start.page.scss']
})
export class DirectDepositStartPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  next() {
    this.router.navigate(['/signup/deposit/money']);
  }
}
