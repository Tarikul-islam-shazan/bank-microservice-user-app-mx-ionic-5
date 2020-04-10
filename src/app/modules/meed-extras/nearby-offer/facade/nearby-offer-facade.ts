import { Injectable } from '@angular/core';
import { MeedExtraService } from '../../services/meed-extra.service';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Offer } from '@app/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';

@Injectable()
export class NearbyOfferFacade {
  public address = {};
  constructor(
    private meedExtraService: MeedExtraService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private router: Router,
    private analytics: AnalyticsService
  ) {}

  findOffers(zipCode: number = null, lat: number = null, long: number = null): Observable<Offer[]> {
    let params = {};
    if (zipCode !== null) {
      params = {
        zipcode: zipCode,
        shop_type: 'instore',
        requires_activation: 't'
      };
    } else {
      params = {
        lat,
        long
      };
    }
    this.analytics.logEvent(AnalyticsEventTypes.NearbyZipSearchInitiated, { zipCode });
    return this.meedExtraService.searchOffer(params);
  }
  async findLocalOffer(): Promise<Observable<Offer[]>> {
    const coords = await this.findCurrentLocation();
    await this.findAddress(coords.latitude, coords.longitude);
    return Promise.resolve(this.findOffers(null, coords.latitude, coords.longitude));
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
      this.address = geoCoderInfo[0];
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
}
