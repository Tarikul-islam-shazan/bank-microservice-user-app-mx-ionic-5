import { Injectable } from '@angular/core';
import { CardService, ICard, ICardParams, CardStatus } from '@app/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class CardStatusFacade {
  cards$: Observable<ICard[]>;
  constructor(private cardService: CardService, private navCtl: NavController, private analytics: AnalyticsService) {
    this.getCardDetails();
  }

  getCardDetails(): void {
    this.cards$ = this.cardService.cardDetails;
  }

  updateCardStatus(apiData: ICardParams): void {
    this.analytics.logEvent(AnalyticsEventTypes.CardStatusChanged);
    this.cardService
      .updateCardStatus(apiData)
      .pipe(
        tap(resp => {
          this.cardService.cards$
            .pipe(
              map((cardsObj: any) => {
                const { cards } = cardsObj;
                return cards.forEach((c: ICard) => {
                  if (c.cardId === apiData.cardId) {
                    c.isCardActive = apiData.state === CardStatus.Locked ? false : true;
                  }
                });
              }),
              take(1)
            )
            .subscribe();
        })
      )
      .subscribe();
    this.navCtl.pop();
  }
}
