import { Component, OnInit } from '@angular/core';
import { MeedTravelFacade } from '../facade';

@Component({
  selector: 'mbc-meed-travel',
  templateUrl: './meed-travel.page.html',
  styleUrls: ['./meed-travel.page.scss']
})
export class MeedTravelPage implements OnInit {
  constructor(public meedTravelFacade: MeedTravelFacade) {}

  ngOnInit() {}

  book() {
    this.meedTravelFacade.book();
  }

  viewPolicy() {
    this.meedTravelFacade.loadPdf();
  }
}
