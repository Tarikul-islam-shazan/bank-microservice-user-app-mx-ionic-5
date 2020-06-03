import { Component, OnInit, ViewChild } from '@angular/core';
import { IStatement } from '@app/core';
import { IonSlides } from '@ionic/angular';
import { StatementsFacade } from '../facade';

@Component({
  selector: 'app-statements',
  templateUrl: './statements.page.html',
  styleUrls: ['./statements.page.scss']
})
export class StatementsPage implements OnInit {
  @ViewChild('slides', { static: false }) slides: IonSlides;
  isBeginning = true;
  isEnd = true;

  constructor(public statementFacade: StatementsFacade) {}

  ngOnInit(): void {}

  slidePrevious(): void {
    this.slides.slidePrev();
  }

  slideNext(): void {
    this.slides.slideNext();
  }

  async doCheck() {
    this.isBeginning = await this.slides.isBeginning();
    this.isEnd = await this.slides.isEnd();
  }

  /**
   * Opens up the modal which will allow a user to view pdf or downlaod xml file
   *
   * @param {*} event
   * @param {IStatement} month
   * @param {string} acountType
   * @memberof StatementsPage
   */
  openModal(event: any, month: IStatement, acountType: string): void {
    this.statementFacade.openModal(month, acountType);
  }
}
