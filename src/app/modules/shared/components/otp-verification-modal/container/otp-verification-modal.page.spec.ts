import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtpVerificationModalPage } from './otp-verification-modal.page';

describe('OtpVerificationModalPage', () => {
  let component: OtpVerificationModalPage;
  let fixture: ComponentFixture<OtpVerificationModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtpVerificationModalPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtpVerificationModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
