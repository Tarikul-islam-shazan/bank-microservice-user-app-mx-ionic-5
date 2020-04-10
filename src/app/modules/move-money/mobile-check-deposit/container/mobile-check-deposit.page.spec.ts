import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileCheckDepositPage } from './mobile-check-deposit.page';

describe('MobileCheckDepositPage', () => {
  let component: MobileCheckDepositPage;
  let fixture: ComponentFixture<MobileCheckDepositPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MobileCheckDepositPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileCheckDepositPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
