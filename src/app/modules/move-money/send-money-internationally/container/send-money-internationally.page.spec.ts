import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendMoneyInternationallyPage } from './send-money-internationally.page';

describe('SendMoneyInternationallyPage', () => {
  let component: SendMoneyInternationallyPage;
  let fixture: ComponentFixture<SendMoneyInternationallyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendMoneyInternationallyPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendMoneyInternationallyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
