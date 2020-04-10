/*
  Container: Intro page with marketing slide and button
  Details: Intro Screen content showing in that component
  Date: 14-02-2020
  Developer: Utpaul <Utpal.Sarker@brainstation23.com>
 */
import { Component, Input } from '@angular/core';
import { ISliderContent } from '@app/signup/intro/models';

@Component({
  selector: 'app-intro-slider-content',
  templateUrl: './intro-slider-content.component.html',
  styleUrls: ['./intro-slider-content.component.scss']
})
export class IntroSliderContentComponent {
  @Input() sliderContent: ISliderContent;
  constructor() {}
}
