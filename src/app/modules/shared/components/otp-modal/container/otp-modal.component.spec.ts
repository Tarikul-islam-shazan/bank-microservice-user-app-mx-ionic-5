import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtpModalComponent } from './otp-modal.component';

describe('OtpModalComponent', () => {
  let component: OtpModalComponent;
  let fixture: ComponentFixture<OtpModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtpModalComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
