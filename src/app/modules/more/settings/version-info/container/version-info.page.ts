import { Component, OnInit } from '@angular/core';
import { VersionInfoFacade } from '../facade';

@Component({
  selector: 'mbc-version-info',
  templateUrl: './version-info.page.html',
  styleUrls: ['./version-info.page.scss']
})
export class VersionInfoPage implements OnInit {
  constructor(public versionInfoFacade: VersionInfoFacade) {}

  ngOnInit() {}
}
