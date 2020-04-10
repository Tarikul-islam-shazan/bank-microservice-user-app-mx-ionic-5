import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreditDebitCardPage } from './credit-debit-card.page';

describe('CreditDebitCardPage', () => {
  let component: CreditDebitCardPage;
  let fixture: ComponentFixture<CreditDebitCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreditDebitCardPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreditDebitCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
