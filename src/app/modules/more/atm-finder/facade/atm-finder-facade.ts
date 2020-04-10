import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation/ngx';
import { IBankAtmRequestParams, IBankAtm, UnitOfMeasureType, ICoordinates, AppPlatform } from '@app/core';
import { ModalService, IMeedModalContent } from '@app/shared';
import { MoreMenuService } from '@app/core/services/more-menu-service.service';

@Injectable()
export class AtmFinderFacade {
  atms: IBankAtm[];
  coords: ICoordinates = { latitude: 0, longitude: 0 };
  zoom = 12;
  private areaDistance = 10;

  constructor(
    private moreMenuService: MoreMenuService,
    private domSanitizer: DomSanitizer,
    private geolocation: Geolocation,
    private appPlatform: AppPlatform,
    private modalService: ModalService,
    private router: Router
  ) {}

  /**
   * This method is called ATM finder page which will
   * return all the Nearest ATM's location by user current
   * Latitude, Longitude
   *
   * @param null
   * @returns null {  Promise<void> }
   */
  async getNearestAtms(): Promise<void> {
    if (this.appPlatform.isCordova()) {
      const locationEnabled = await this.isLocationEnabled();
      const locationPermission = await this.appPlatform.requestLocationPermission();

      if (locationEnabled && locationPermission) {
        this.coords = await this.getCurrentLocation();
        this.getAtmByGeoCode(this.coords);
      } else {
        await this.openLocationAuthorizedModal();
      }
    } else if (this.appPlatform.isMobileWeb()) {
      this.coords = await this.getCurrentLocation();
      this.getAtmByGeoCode(this.coords);
    }
  }

  /**
   * This method will Get all ATM's location from Meed
   * service by using user current Latitude, Longitude.
   *
   * @param coords { ICoordinates }
   * @returns null { Promise<void>}
   */
  private async getAtmByGeoCode(coords: ICoordinates): Promise<void> {
    const requestParams: IBankAtmRequestParams = {
      distance: this.areaDistance,
      locationType: 'BranchAtm',
      unitOfMeasure: UnitOfMeasureType.Imperial,
      latitude: coords.latitude,
      longitude: coords.longitude
    };
    this.moreMenuService.getAtmByGeoCode(requestParams).subscribe(async resp => {
      const atms: IBankAtm[] = [];
      resp.forEach(async atm => {
        atm.mapUrl = await this.getAtmMapUrl(atm);
        atms.push(atm);
      });
      this.atms = atms;
    });
  }

  /**
   * Search ATM's by specific address
   *
   * @param _address { string } Atm address
   * @returns null { Promise<void> }
   */
  private async getAtmByAddress(_address: string): Promise<void> {
    const requestParams: IBankAtmRequestParams = {
      distance: this.areaDistance,
      locationType: 'BranchAtm',
      unitOfMeasure: UnitOfMeasureType.Imperial,
      address: _address
    };
    this.moreMenuService.getAtmByAddress(requestParams).subscribe(async resp => {
      const atms: IBankAtm[] = [];
      resp.forEach(async atm => {
        atm.mapUrl = await this.getAtmMapUrl(atm);
        atms.push(atm);
      });
      this.atms = atms;
    });
  }

  /**
   * This method will return current Latitude, Longitude
   * from cordova Geolocation plugin
   *
   * @param null
   * @returns promise { Promise<ICoordinates> }
   */
  private async getCurrentLocation(): Promise<ICoordinates> {
    const options: GeolocationOptions = { maximumAge: 3000, timeout: 1000, enableHighAccuracy: true };
    const { coords } = await this.geolocation.getCurrentPosition(options);
    if (coords) {
      return Promise.resolve({ latitude: coords.latitude, longitude: coords.longitude });
    } else {
      return Promise.resolve({ latitude: 0, longitude: 0 });
    }
  }

  /**
   * This method return Google Map Url to show map view
   * on UI. It will return Map View URL with provided coordinates
   *
   * @param atm { IBankAtm }
   * @returns mapView { Promise<any> }
   */
  private async getAtmMapUrl(atm: IBankAtm): Promise<any> {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      `https://maps.googleapis.com/maps/api/staticmap?center=
    		${atm.location.latitude},${atm.location.longitude}&zoom=15&size=60x60&key=AIzaSyCWqVSO6q6dVoEpu5EZ50KrmsCzrW4IVfo`
    );
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

  /**
   * This method will show a permission modal if
   * user denied Location permission twice
   *
   * @param null
   * @returns null { Promise<void> }
   */
  private async openLocationAuthorizedModal(): Promise<void> {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'info-modal-module.allow-location-services.title',
          details: ['info-modal-module.allow-location-services.details.content1']
        }
      ],
      actionButtons: [
        {
          text: 'info-modal-module.allow-location-services.buttons.button1',
          cssClass: 'white-button',
          handler: async () => {
            await this.modalService.close();
            const locationEnabled = await this.isLocationEnabled();
            if (locationEnabled) {
              await this.appPlatform.openNativeAppSetting();
            } else {
              await this.appPlatform.goToLocationSettings();
            }
          }
        },
        {
          text: 'info-modal-module.allow-location-services.buttons.button2',
          cssClass: 'grey-outline-button',
          handler: async () => {
            await this.modalService.close();
          }
        }
      ],
      onDidDismiss: () => {
        this.router.navigate(['/dashboard/more']);
      }
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }
}
