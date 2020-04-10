/*
  Container: Intro page with marketing slide and button
  Details: Initialize intro slider content and showing to screen
  Date: 14-02-2020
  Developer: Utpaul <Utpal.Sarker@brainstation23.com>
 */

import { Component, OnInit } from '@angular/core';
import { ISliderContent } from '@app/signup/intro/models';
import { IntroFacade } from '@app/signup/intro/facade';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss']
})
export class IntroPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  introSliderOptions: ISliderContent[];
  constructor(public facade: IntroFacade) {}
  ngOnInit() {
    this.introSliderOptions = this.facade.introSliderOptions;
  }
}
