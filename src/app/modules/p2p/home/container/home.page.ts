import { Component, OnInit } from '@angular/core';
import { IContact } from '@app/p2p/models';
import { HomeP2PFacade } from '../facade';

@Component({
  selector: 'mbc-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  searchQuery: string;
  myPayees: IContact[] = [];
  isEditable = false;
  constructor(private facade: HomeP2PFacade) {}

  ngOnInit() {
    this.getAllContacts();
  }

  getAllContacts() {
    this.facade.getAllContacts().subscribe(contacts => (this.myPayees = contacts));
  }

  makeContactEditAble() {
    this.isEditable = !this.isEditable;
  }

  searchContact() {}
}
