/**
 * Container: Info Modal
 * Details: This modal is a common info modal for showing info
 * Developer: Sanitul <sanitul@bs-23.com>
 */
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IContent, IButton } from '@app/shared/services/modal.service';
/**
 * encapsulation: is a property of @component: The class added to innerHTML is ignored because by default the encapsulation
 * is Emulated. Which means Angular prevents styles from intercepting inside and outside of the component.
 * You should change the encapsulation to None in your component.
 * This way, you'll be able to define classes wherever you want:
 * inside styles or in a separate .css, .scss or .less style-sheet (it doesn't matter) and
 * Angular will add them to the DOM automatically.
 * @export
 * @class InfoModalComponent
 * Issue: GMA-4735
 * Problem: info modal showing according with invision and also fix innerHtml content css apply
 * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
 */
@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.component.html',
  styleUrls: ['./info-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InfoModalComponent {
  @Input() contents: IContent[];
  @Input() actionButtons: IButton[];

  constructor(private modalCtrl: ModalController) {}

  async dismiss(option?: any): Promise<boolean> {
    return await this.modalCtrl.dismiss(option);
  }
}
