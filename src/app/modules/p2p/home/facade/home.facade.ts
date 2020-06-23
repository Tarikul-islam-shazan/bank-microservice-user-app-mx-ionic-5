import { P2PService } from '@app/p2p/services/p2p.service';
import { Observable } from 'rxjs';
import { IContact } from '@app/p2p/models';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { Router } from '@angular/router';
@Injectable()
export class HomeP2PFacade {
  public myPayees: IContact[] = [];
  public myPayees$: Observable<IContact[]>;
  public searchResult: IContact[] = [];
  public startSearching = false;
  constructor(private p2pService: P2PService, private analytics: AnalyticsService, private router: Router) {
    this.getAllContacts();
  }

  getAllContacts() {
    this.myPayees$ = this.p2pService.getAllContacts().pipe(map(payees => (this.myPayees = payees)));
  }

  searchContact(query: string) {
    if (query) {
      this.startSearching = true;
    } else {
      this.startSearching = false;
    }
  }

  next(payeeTo: string) {
    this.analytics.logEvent(AnalyticsEventTypes.P2PSearchedNext);
    this.router.navigate(['/p2p/registration-type/', payeeTo]);
  }
}
