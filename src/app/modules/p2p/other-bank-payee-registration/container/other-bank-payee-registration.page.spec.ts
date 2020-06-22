import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherBankPayeeRegistrationPage } from './other-bank-payee-registration.page';

describe('OtherBankPayeeRegistrationPage', () => {
  let component: OtherBankPayeeRegistrationPage;
  let fixture: ComponentFixture<OtherBankPayeeRegistrationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtherBankPayeeRegistrationPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherBankPayeeRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
