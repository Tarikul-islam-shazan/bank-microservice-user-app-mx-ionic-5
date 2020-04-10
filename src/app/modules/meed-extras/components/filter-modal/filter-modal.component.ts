import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent implements OnInit {
  options: any;
  title: any;

  isActive = false;
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    public translateService: TranslateService
  ) {}

  ngOnInit() {
    this.options = this.navParams.get('data');
    this.title = this.navParams.get('type');
  }

  async dismiss() {
    return await this.modalCtrl.dismiss();
  }

  changeSelection() {
    this.isActive = false;
    this.options.forEach(option => {
      if (option.isChecked === true) {
        this.isActive = true;
      }
    });
  }

  reset() {
    this.options.map(option => {
      option.isChecked = false;
      return option;
    });
  }

  async categoryFilter() {
    await this.modalCtrl.dismiss(this.options);
  }

  getTranslation(key: string): Observable<string> {
    return this.translateService.get(key);
  }
}
