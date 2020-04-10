import { Injectable } from '@angular/core';
import { MeedExtraService } from '../../services/meed-extra.service';
import { FilterModalComponent } from '@app/meed-extras/components';
import { ModalController } from '@ionic/angular';
import { Offer, Category } from '@app/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class SearchOffersFacade {
  public searchedOffers = [];
  public searchField = '';
  public categoryFieldText = '';
  public categoryFieldValue = '';
  public typeFieldText = '';
  public typeFieldValue = '';
  public typeList = [
    {
      text: 'Online',
      value: 'online'
    },
    {
      text: 'In Store',
      value: 'instore'
    }
  ];
  constructor(private meedExtraService: MeedExtraService, private modalCtrl: ModalController, private router: Router) {}

  async openFilterModal(filterType: string, categories: Category[] = []) {
    if (filterType === 'category') {
      this.categoryFilter(categories);
    } else {
      this.typeFilter();
    }
  }

  async categoryFilter(categories: Category[]) {
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
      this.searchOffer();
    } else {
      this.categoryFieldText = this.categoryFieldText;
      this.categoryFieldValue = this.categoryFieldValue;
    }
  }

  async typeFilter() {
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
      this.searchOffer();
    } else {
      this.typeFieldText = this.typeFieldText;
      this.typeFieldValue = this.typeFieldValue;
    }
  }

  async searchOffer() {
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

  clearSearch(): void {
    this.typeFieldText = '';
    this.typeFieldValue = '';
    this.categoryFieldText = '';
    this.categoryFieldValue = '';
    this.searchField = '';
    this.searchedOffers = [];
  }

  setOffer(offer: Offer): void {
    this.meedExtraService.offer = offer;
    if (offer.shopType === 'online') {
      this.router.navigate(['/meed-extras/online-offer']);
    } else if (offer.shopType === 'instore') {
      this.router.navigate(['/meed-extras/instore-offer']);
    }
  }

  loadCategory(): Observable<Category[]> {
    return this.meedExtraService.categories;
  }
}
