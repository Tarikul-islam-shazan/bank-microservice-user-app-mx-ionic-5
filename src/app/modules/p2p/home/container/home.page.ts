import { Component, OnInit } from '@angular/core';
import { HomeP2PFacade } from '../facade';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IContact } from '@app/p2p/models';

@Component({
  selector: 'mbc-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  searchQuery: string;
  myPayees$: Observable<IContact[]>;
  isEditable = false;
  constructor(public readonly facade: HomeP2PFacade) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.searchQuery = '';
    this.searchContact();
    this.myPayees$ = this.facade.getAllContacts();
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
}
