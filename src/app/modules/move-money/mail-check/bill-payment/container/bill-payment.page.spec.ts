import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillPaymentPage } from './bill-payment.page';

describe('BillPaymentPage', () => {
  let component: BillPaymentPage;
  let fixture: ComponentFixture<BillPaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillPaymentPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
