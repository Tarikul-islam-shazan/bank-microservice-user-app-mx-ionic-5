import { Component, OnInit } from '@angular/core';
import { PrivacyLegalFacade } from '../facade/privacy-legal-facade';
@Component({
  selector: 'mbc-privacy-legal',
  templateUrl: './privacy-legal.page.html',
  styleUrls: ['./privacy-legal.page.scss']
})
export class PrivacyLegalPage implements OnInit {
  constructor(public privacyLegalFacade: PrivacyLegalFacade) {}

  ngOnInit() {}
}
