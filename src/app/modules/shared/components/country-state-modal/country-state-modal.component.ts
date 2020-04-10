import { Component, Input, OnInit } from '@angular/core';
import { IStates } from '@app/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'country-state-modal',
  templateUrl: './country-state-modal.component.html',
  styleUrls: ['./country-state-modal.component.scss']
})
export class CountryStateModalComponent implements OnInit {
  @Input() data: IStates[];
  countryStates: IStates[];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.getCountryState();
  }

  /**
   * @summary assignes country states
   *
   * @private
   * @returns {void}
   * @memberOf CountryStateModalComponent
   */
  private getCountryState(): void {
    this.countryStates = this.data;
  }

  /**
   * @summary closes the modal
   *
   * @param {IStates} [countryState]
   * @returns {Promise<void>}
   * @memberOf CountryStateModalComponent
   */
  async dismiss(countryState?: IStates): Promise<void> {
    await this.modalCtrl.dismiss(countryState);
  }

  /**
   * @summary searches states with the given input
   *
   * @param {any} event
   * @returns {void}
   * @memberOf CountryStateModalComponent
   */
  searchState(event: any): void {
    const query = event.detail.value;
    if (query && query.trim() !== '') {
      this.countryStates = this.data.filter(item => {
        return item.stateName.toLowerCase().indexOf(query.toLowerCase()) === 0;
      });
    } else {
      this.getCountryState();
    }
  }
}
