import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopUpPaymentPage } from './top-up-payment.page';

describe('TopUpPaymentPage', () => {
  let component: TopUpPaymentPage;
  let fixture: ComponentFixture<TopUpPaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopUpPaymentPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopUpPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
