/*
  Container: Intro page with marketing slide and button
  Details: Initialize intro slider content and showing to screen
  Date: 14-02-2020
  Developer: Utpaul <Utpal.Sarker@brainstation23.com>
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ISliderContent } from '@app/signup/intro/models';

@Injectable()
export class IntroFacade {
  constructor(private router: Router) {}
  /*
   * Ticket: GMA-4465
   * Details: Third intro screen is showing the image of Fourth screen and vice versa issue resolve
   * Date: 25-02-2020
   * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
   */
  get introSliderOptions(): ISliderContent[] {
    return [
      {
        image: 'assets/img/intro/intro-do-money-transparent.png',
        title: 'signup-module.intro-page.intro-do-money-differently-title',
        details: 'signup-module.intro-page.intro-do-money-differently-details'
      },
      {
        image: 'assets/img/intro/intro-earn-with-meed-extras.png',
        title: 'signup-module.intro-page.intro-more-rewards-title',
        details: 'signup-module.intro-page.intro-more-rewards-details'
      },
      {
        image: 'assets/img/intro/intro-get-paid-instantly.png',
        title: 'signup-module.intro-page.intro-get-paid-instantly-title',
        details: 'signup-module.intro-page.intro-get-paid-instantly-details'
      },
      {
        image: 'assets/img/intro/intro-earn-with-meed-travel.png',
        title: 'signup-module.intro-page.intro-send-money-anyone-anywhere-title',
        details: 'signup-module.intro-page.intro-send-money-anyone-anywhere-details'
      },
      {
        image: '',
        title: 'signup-module.intro-page.intro-atms-title',
        details: 'signup-module.intro-page.intro-atms-details'
      }
    ];
  }
  goToSignUpEmail() {
    this.router.navigate(['/signup/email']);
  }
}
