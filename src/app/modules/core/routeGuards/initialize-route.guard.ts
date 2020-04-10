/**
 * * Issue: GMA-4750
 * * Issue Details: Applying intro sign up login flow like ionic 3 in ionic 4
 * * Developer Feedback: Feature Implemented
 * Date: March 25, 2020
 * Developer: Zahidul Islam <zahidul@bs-23.net>
 */

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SettingsService } from '../services';

/**
 * @summary This route guard will decide signup disable or not.
 *          if user done signup then this guard return true otherwise route to signup intro page.
 * @export
 * @class InitializeRouteGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class InitializeRouteGuard implements CanActivate {
  constructor(private readonly settingService: SettingsService, private readonly router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // checking is Signup completed or not;
    const canActive = this.settingService.getSettings().userSettings.disabledSignUp;
    if (!canActive) {
      this.router.navigateByUrl('/signup/intro');
    }
    return canActive;
  }
}
