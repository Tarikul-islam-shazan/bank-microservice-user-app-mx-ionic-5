import { Injectable } from '@angular/core';
import { SignUpService, IScannedIdData, JumioApiService, IMemberApplication, IAddressInfo } from '@app/core';
import { Router } from '@angular/router';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
@Injectable()
export class AddressInformationFacade {
  public maxDate: string;
  public postalCodeData: Partial<IAddressInfo[]>;
  constructor(
    private signUpService: SignUpService,
    private jumioService: JumioApiService,
    private router: Router,
    private analytics: AnalyticsService
  ) {}

  getJumioScanData(): IScannedIdData {
    return this.jumioService.scannedIdData;
  }

  getPostalCodeInfo(postalCode): any {
    if (postalCode.toString().length === 6) {
      this.signUpService.getStateCityMunicipality(postalCode).subscribe((data: Partial<IAddressInfo[]>) => {
        this.postalCodeData = data;
      });
    }
  }

  goToNext(memberApp: IMemberApplication) {
    Object.assign(this.signUpService.memberApplication, memberApp);
    this.analytics.logEvent(AnalyticsEventTypes.AddressInfoSubmitted);
    this.router.navigate(['/signup/confirm-identity']);
  }
}
