import { Component, OnInit } from '@angular/core';
import { SweepFacade } from '../facade';

@Component({
  selector: 'mbc-sweep',
  templateUrl: './sweep.page.html',
  styleUrls: ['./sweep.page.scss']
})
export class SweepPage implements OnInit {
  constructor(public sweepFacade: SweepFacade) {}

  ngOnInit() {
    this.sweepFacade.loadSweepState();
  }
}
