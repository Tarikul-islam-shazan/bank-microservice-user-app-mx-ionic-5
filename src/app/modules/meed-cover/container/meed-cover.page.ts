import { Component, OnInit } from '@angular/core';
import { MeedCoverFacade } from '../facade';

@Component({
  selector: 'mbc-meed-cover',
  templateUrl: './meed-cover.page.html',
  styleUrls: ['./meed-cover.page.scss']
})
export class MeedCoverPage implements OnInit {
  constructor(public meedCoverFacade: MeedCoverFacade) {}

  ngOnInit() {}

  viewPolicy() {
    this.meedCoverFacade.loadPdf();
  }
}
