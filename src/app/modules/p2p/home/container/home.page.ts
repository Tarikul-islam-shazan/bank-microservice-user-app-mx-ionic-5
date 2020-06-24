import { Component, OnInit } from '@angular/core';
import { IContact } from '@app/p2p/models';
import { HomeP2PFacade } from '../facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'mbc-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  searchQuery: string;
  isEditable = false;
  constructor(public readonly facade: HomeP2PFacade) {}

  ngOnInit() {}

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
