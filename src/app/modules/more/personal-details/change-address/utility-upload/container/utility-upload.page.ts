import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mbc-utility-upload',
  templateUrl: './utility-upload.page.html',
  styleUrls: ['./utility-upload.page.scss']
})
export class UtilityUploadPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  dismiss() {
    this.router.navigate([`/more/personal-details/change-address`]);
  }
}
