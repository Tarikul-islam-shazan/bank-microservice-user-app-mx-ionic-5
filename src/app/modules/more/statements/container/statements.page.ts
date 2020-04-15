import { Component, OnInit, ViewChild } from '@angular/core';
import { IMonthlyStatement } from '@app/core';
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

  selectStatementYear(year: string): void {}

  readpdf(event: any, month: IMonthlyStatement, acountType: string): void {
    this.statementFacade.loadPdf(month, acountType);
  }
}