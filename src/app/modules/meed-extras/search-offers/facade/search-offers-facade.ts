import { Injectable } from '@angular/core';
import { MeedExtraService } from '../../services/meed-extra.service';
import { FilterModalComponent } from '@app/meed-extras/components';
import { ModalController } from '@ionic/angular';
import { Offer, Category } from '@app/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnalyticsEventTypes, AnalyticsService } from '@app/analytics';

@Injectable()
export class SearchOffersFacade {
  searchedOffers = [];
  searchField = '';
  categoryFieldText = '';
  categoryFieldValue = '';
  typeFieldText = '';
  typeFieldValue = '';
  typeList = [
    {
      text: 'In Store',
      value: 'instore'
    },
    {
      text: 'Online',
      value: 'online'
    }
  ];
  constructor(
    private meedExtraService: MeedExtraService,
    private modalCtrl: ModalController,
    private router: Router,
    private readonly analyticsService: AnalyticsService
  ) {}

  /**
   * @summary opens filter modal
   *
   * @param {string} filterType
   * @param {Category[]} [categories=[]]
   * @returns {Promise<void>}
   * @memberOf SearchOffersFacade
   */
  async openFilterModal(filterType: string, categories: Category[] = []): Promise<void> {
    if (filterType === 'category') {
      this.categoryFilter(categories);
    } else {
      this.typeFilter();
    }
  }

  /**
   * @summary filters offer category
   *
   * @private
   * @param {Category[]} categories
   * @returns {Promise<void>}
   * @memberOf SearchOffersFacade
   */
  private async categoryFilter(categories: Category[]): Promise<void> {
    const categoriesModal = await this.modalCtrl.create({
      component: FilterModalComponent,
      componentProps: { data: categories, type: 'Category' }
    });
    await categoriesModal.present();
    const catData = await categoriesModal.onDidDismiss();
    if (catData.data) {
      this.categoryFieldText = '';
      this.categoryFieldValue = '';
      catData.data.forEach(categoryData => {
        if (categoryData.isChecked === true) {
          if (this.categoryFieldText.length > 0) {
            this.categoryFieldText += ',' + categoryData.name;
            this.categoryFieldValue += ',' + categoryData.id;
          } else {
            this.categoryFieldText += categoryData.name;
            this.categoryFieldValue += categoryData.id;
          }
        }
      });
      this.analyticsService.logEvent(AnalyticsEventTypes.SearchDealCategoriesSelected);
      this.searchOffer();
    } else {
      this.categoryFieldText = this.categoryFieldText;
      this.categoryFieldValue = this.categoryFieldValue;
    }
  }

  /**
   * @summary filters offer type
   *
   * @private
   * @returns {Promise<void>}
   * @memberOf SearchOffersFacade
   */
  private async typeFilter(): Promise<void> {
    const typeModal = await this.modalCtrl.create({
      component: FilterModalComponent,
      componentProps: { data: this.typeList, type: 'Type' }
    });
    await typeModal.present();
    const typesData = await typeModal.onDidDismiss();
    if (typesData.data) {
      this.typeFieldText = '';
      this.typeFieldValue = '';
      typesData.data.forEach(typeData => {
        if (typeData.isChecked === true) {
          if (this.typeFieldText.length > 0) {
            this.typeFieldText += ',' + typeData.text;
            this.typeFieldValue += ',' + typeData.value;
          } else {
            this.typeFieldText += typeData.text;
            this.typeFieldValue += typeData.value;
          }
        }
      });
      this.analyticsService.logEvent(AnalyticsEventTypes.SearchDealTypesSelected);
      this.searchOffer();
    } else {
      this.typeFieldText = this.typeFieldText;
      this.typeFieldValue = this.typeFieldValue;
    }
  }

  /**
   * @summary searches offers
   *
   * @returns {Promise<void>}
   * @memberOf SearchOffersFacade
   */
  async searchOffer(): Promise<void> {
    if (this.searchField !== '' || this.typeFieldValue !== '' || this.categoryFieldValue !== '') {
      const params = {
        keyword: this.searchField,
        shop_type: this.typeFieldValue,
        categoryid: this.categoryFieldValue
      };
      this.meedExtraService.searchOffer(params).subscribe((offers: Offer[]) => {
        this.searchedOffers = offers;
      });
    }
  }

  /**
   * @summary clears search text
   *
   * @returns {void}
   * @memberOf SearchOffersFacade
   */
  clearSearch(): void {
    this.typeFieldText = '';
    this.typeFieldValue = '';
    this.categoryFieldText = '';
    this.categoryFieldValue = '';
    this.searchField = '';
    this.searchedOffers = [];
  }

  /**
   * @summary sets offer to navigate offers page
   *
   * @param {Offer} offer
   * @returns {void}
   * @memberOf SearchOffersFacade
   */
  setOffer(offer: Offer): void {
    this.meedExtraService.offer = offer;
    if (offer.shopType === 'online') {
      this.router.navigate(['/meed-extras/online-offer']);
    } else if (offer.shopType === 'instore') {
      this.router.navigate(['/meed-extras/instore-offer']);
    }
  }

  /**
   * @summary loads category
   *
   * @returns {Observable<Category[]>}
   * @memberOf SearchOffersFacade
   */
  loadCategory(): Observable<Category[]> {
    return this.meedExtraService.categories;
  }
}
