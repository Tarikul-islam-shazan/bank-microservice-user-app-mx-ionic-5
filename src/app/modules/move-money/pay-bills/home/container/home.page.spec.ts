import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayBillsHomePage } from './home.page';

describe('HomePage', () => {
  let component: PayBillsHomePage;
  let fixture: ComponentFixture<PayBillsHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PayBillsHomePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayBillsHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
