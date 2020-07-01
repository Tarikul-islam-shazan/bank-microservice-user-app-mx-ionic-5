import { Component, OnInit } from '@angular/core';
import { HomeP2PFacade } from '../facade';

@Component({
  selector: 'mbc-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  searchQuery = '';
  isEditable = false;
  constructor(public readonly facade: HomeP2PFacade) {}

  ngOnInit() {}

  ionViewWillLeave() {
    this.searchQuery = '';
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
