import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss']
})
export class RewardsPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToMeedExtraPage() {
    this.router.navigate(['/meed-extras']);
  }

  goToMeedSharePage() {
    this.router.navigate(['/meed-share']);
  }

  goToMeedTravelPage() {
    this.router.navigate(['/meed-travel']);
  }

  goToMeedCoverPage() {
    this.router.navigate(['/meed-cover']);
  }
}
