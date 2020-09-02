import { Injectable } from '@angular/core';
import { MeedShareService } from '../services';
import { Observable } from 'rxjs';
import { IMeedShare, ValueType } from '@app/core/models/dto/share';
import { IMeedModalContent, ModalService } from '@app/shared';

@Injectable()
export class MeedShareFacade {
  meedShare$: Observable<IMeedShare>;
  constructor(private meedShareService: MeedShareService, private modalService: ModalService) {
    this.loadShareData();
  }

  loadShareData(): void {
    this.meedShare$ = this.meedShareService.getShareData();
  }

  get valueType(): typeof ValueType {
    return ValueType;
  }

  /**
   *
   *
   * @memberof MeedShareFacade
   */
  async showModal() {
    const componentProps: IMeedModalContent = {
      contents: [
        {
          title: 'meed-share-page.main-page.modal-title',
          details: [
            'meed-share-page.main-page.modal-text-1',
            'meed-share-page.main-page.modal-text-2',
            'meed-share-page.main-page.modal-text-3',
            'meed-share-page.main-page.modal-text-4',
            'meed-share-page.main-page.modal-text-5'
          ]
        }
      ]
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }
}
