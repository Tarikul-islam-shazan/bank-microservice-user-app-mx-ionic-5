import { Component, Input, OnInit } from '@angular/core';
import { ICountry } from '@app/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-country-modal',
  templateUrl: './country-modal.component.html',
  styleUrls: ['./country-modal.component.scss']
})
export class CountryModalComponent implements OnInit {
  @Input() data: ICountry[];
  countries: ICountry[];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.getCountryState();
  }

  /**
   * @summary assignes input data to countries
   *
   * @returns {void}
   * @memberOf CountryModalComponent
   */
  private getCountryState(): void {
    this.countries = this.data;
  }

  /**
   * @summary closes modal
   *
   * @param {ICountry} [countryState]
   * @returns {void}
   * @memberOf CountryModalComponent
   */
  dismiss(countryState?: ICountry): void {
    this.modalCtrl.dismiss(countryState);
  }
}
