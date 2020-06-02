import { Injectable } from '@angular/core';
import { CardService, ICard, ICardParams, CardStatus } from '@app/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class CardStatusFacade {
  cards$: Observable<ICard>;
  constructor(private cardService: CardService, private navCtl: NavController, private analytics: AnalyticsService) {
    this.getCardDetails();
  }

  /**
   * @summary gets card details
   *
   * @returns {void}
   * @memberOf CardStatusFacade
   */
  getCardDetails(): void {
    this.cards$ = this.cardService.cardDetails;
  }

  /**
   * @summary changes card activate status
   *
   * @private
   * @param {ICardParams} apiData
   * @returns {Observable<ICard>}
   * @memberOf CardStatusFacade
   */
  private changeCardActiveStatus(apiData: ICardParams): Observable<ICard> {
    return this.cardService.cards$.pipe(
      tap((card: ICard) => {
        if (card.cardId === apiData.cardId) {
          card.isCardActive = apiData.state === CardStatus.Locked ? false : true;
        }
      })
    );
  }

  /**
   * @summary updates card status
   *
   * @param {ICardParams} apiData
   * @returns {void}
   * @memberOf CardStatusFacade
   */
  updateCardStatus(apiData: ICardParams): void {
    this.analytics.logEvent(AnalyticsEventTypes.CardStatusChanged);
    this.cardService
      .updateCardStatus(apiData)
      .pipe(
        switchMap(() => {
          return this.changeCardActiveStatus(apiData);
        })
      )
      .subscribe(() => this.navCtl.pop());
  }
}
