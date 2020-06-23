import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayeeRegistrationTypePage } from './payee-registration-type.page';

describe('PayeeRegistrationTypePage', () => {
  let component: PayeeRegistrationTypePage;
  let fixture: ComponentFixture<PayeeRegistrationTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PayeeRegistrationTypePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayeeRegistrationTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
