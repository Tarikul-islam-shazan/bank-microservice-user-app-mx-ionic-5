import { Component, OnInit } from '@angular/core';
import { HomeP2PFacade } from '../facade';
import { Observable } from 'rxjs';
import { IContact, ContactType } from '@app/p2p/models';
import { Router } from '@angular/router';

@Component({
  selector: 'mbc-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  searchQuery = '';
  myPayees$: Observable<IContact[]>;
  isEditable = false;
  contactType = ContactType;
  constructor(public readonly facade: HomeP2PFacade, private router: Router) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.searchQuery = '';
    this.searchContact();
    this.facade.myPayees$ = this.facade.getAllContacts();
  }

  makeContactEditAble() {
    this.isEditable = !this.isEditable;
  }

  searchContact() {
    this.facade.searchContact(this.searchQuery);
  }

  next() {
    this.facade.next(this.searchQuery);
  }

  edit(payee: IContact) {
    if (payee.contactType === this.contactType.Invex || payee.contactType === this.contactType.Domestic) {
      this.router.navigate(['/p2p/edit-invex-payee-registration/', payee]);
    } else {
      this.router.navigate(['/p2p/edit-other-bank-payee-registration/', payee]);
    }
  }
}
