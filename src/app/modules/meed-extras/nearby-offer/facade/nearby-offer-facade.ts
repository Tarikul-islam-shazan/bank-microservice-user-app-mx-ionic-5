import { Injectable } from '@angular/core';
import { MeedExtraService } from '../../services/meed-extra.service';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Offer, AppPlatform } from '@app/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { map } from 'rxjs/operators';
import { AlphabiticalSortService } from '@app/meed-extras/services';
import { Iindex, Address } from '@app/meed-extras/models/meed-extra';
import { Platform } from '@ionic/angular';

@Injectable()
export class NearbyOfferFacade {
  public address: Address = {};
  public locationAllowed = false;
  resumeListener: Subscription = new Subscription();
  constructor(
    private meedExtraService: MeedExtraService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private router: Router,
    private analytics: AnalyticsService,
    private alphabiticalSortService: AlphabiticalSortService,
    private appPlatform: AppPlatform,
    private platform: Platform
  ) {}

  /**
   * Issue:  MR2-120
   * Details:  MeedExtra > Nearby Offers: "Allow location services" button not showing even though location permission not allowed.
   * Date: May 05, 2020
   * Developer: Raihan <raihanuzzaman@bs-23.net>
   */

  /**
   * This method checkes the location status when the app comes to the froeground
   * from the backgroup. This method only work in android or ios.
   *
   * @memberof NearbyOfferFacade
   */
  checkLocationResume() {
    this.platform.ready().then(() => {
      this.resumeListener = this.platform.resume.subscribe(async () => {
        if (this.platform.is('ios')) {
          this.locationAllowed = false;
          this.address = {};
          const locationEnabled = await this.isLocationEnabled();
          const locationPermission = await this.appPlatform.requestLocationPermission();
          if (locationEnabled && locationPermission) {
            this.locationAllowed = true;
            this.findLocalOffer();
          } else {
            this.locationAllowed = false;
          }
        }
      });
    });
  }

  findOffers(zipCode: number = null, lat: number = null, long: number = null): Observable<[[Iindex | Offer]]> {
    let params = {};
    if (zipCode !== null) {
      params = {
        zipcode: zipCode,
        shop_type: 'instore',
        requires_activation: 't',
        per_page: '10000'
      };
    } else {
      params = {
        lat,
        long,
        per_page: '10000'
      };
    }
    this.analytics.logEvent(AnalyticsEventTypes.NearbyZipSearchInitiated, { zipCode });
    return this.meedExtraService.searchOffer(params).pipe(
      map((offers: Offer[]) => {
        return this.alphabiticalSortService.sortOfferList(offers);
      })
    );
  }
  async findLocalOffer(): Promise<Observable<[[Iindex | Offer]]>> {
    if (this.appPlatform.isCordova()) {
      const locationEnabled = await this.isLocationEnabled();
      const locationPermission = await this.appPlatform.requestLocationPermission();
      if (locationEnabled && locationPermission) {
        this.locationAllowed = true;
        const coords = await this.findCurrentLocation();
        await this.findAddress(coords.latitude, coords.longitude);
        return Promise.resolve(this.findOffers(null, coords.latitude, coords.longitude));
      } else {
        this.locationAllowed = false;
      }
    } else {
      const coords = await this.findCurrentLocation();
      return Promise.resolve(this.findOffers(null, coords.latitude, coords.longitude));
    }
  }

  /**
   * Check Device Location is enabled or not
   *
   * @param null
   * @returns true/false { boolean }
   */
  private async isLocationEnabled(): Promise<boolean> {
    return await this.appPlatform.isLocationEnabled();
  }

  async findCurrentLocation() {
    try {
      const geoInfo = await this.geolocation.getCurrentPosition();
      return geoInfo.coords;
    } catch (error) {
      // TODO: Error service needed
    }
  }

  async findAddress(lat: number = null, long: number = null) {
    try {
      const options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      const geoCoderInfo = await this.nativeGeocoder.reverseGeocode(lat, long, options);
      const { administrativeArea, locality, postalCode, thoroughfare } = geoCoderInfo[0];
      this.address = { administrativeArea, locality, postalCode, thoroughfare };
    } catch (error) {
      // TODO: Error service needed
    }
  }

  setOffer(offer: Offer): void {
    this.meedExtraService.offer = offer;
    if (offer.shopType === 'online') {
      this.router.navigate(['/meed-extras/online-offer']);
    } else if (offer.shopType === 'instore') {
      this.router.navigate(['/meed-extras/instore-offer']);
    }
  }

  async openLocationAuthorization() {
    await this.appPlatform.openNativeAppSetting();
  }

  /**
   * this method helps to unsubscribe the location listener and
   * reset the local variables
   *
   * @memberof NearbyOfferFacade
   */
  willLeave() {
    this.resumeListener.unsubscribe();
    this.locationAllowed = false;
    this.address = {};
  }

  /**
   * this method as the name suggests checks if the current system is
   * a mobile device or not
   * @returns {boolean}
   * @memberof NearbyOfferFacade
   */
  public isMobileDevice(): boolean {
    return this.appPlatform.isCordova();
  }
}
