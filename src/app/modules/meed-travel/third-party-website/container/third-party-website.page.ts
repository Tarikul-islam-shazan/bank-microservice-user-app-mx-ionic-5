import { Component, OnInit } from '@angular/core';
import { StorageService, StorageKey } from '@app/core';

@Component({
  selector: 'mbc-website',
  templateUrl: './third-party-website.page.html',
  styleUrls: ['./third-party-website.page.scss']
})
export class WebsitePage implements OnInit {
  constructor(private storageService: StorageService) {}
  ngOnInit() {
    this.loadData();
  }
  async loadData() {
    const travelWebsiteData = await this.storageService.getItem('travelWebsiteData' as StorageKey);
    (document.getElementById('email') as HTMLInputElement).value = travelWebsiteData.email
      ? travelWebsiteData.email
      : '';
    (document.getElementById('firstName') as HTMLInputElement).value = travelWebsiteData.firstName
      ? travelWebsiteData.firstName
      : '';
    (document.getElementById('lastName') as HTMLInputElement).value = travelWebsiteData.lastName
      ? travelWebsiteData.lastName
      : '';
    (document.getElementById('memberId') as HTMLInputElement).value = travelWebsiteData.memberId
      ? travelWebsiteData.memberId
      : '';
    (document.getElementById('lang') as HTMLInputElement).value = travelWebsiteData.lang;
    (document.getElementById('token') as HTMLInputElement).value = travelWebsiteData.token;
    (document.getElementById('registrationForm') as HTMLFormElement).action = travelWebsiteData.url;
    await this.storageService.removeItem('travelWebsiteData' as StorageKey);
    if (travelWebsiteData) {
      (document.getElementById('registrationForm') as HTMLFormElement).submit();
    }
  }
}
