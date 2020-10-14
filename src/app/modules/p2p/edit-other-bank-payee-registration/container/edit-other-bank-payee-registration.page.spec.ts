import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditOtherBankPayeeRegistrationPage } from '../container/edit-other-bank-payee-registration.page';

describe('EditOtherBankPayeeRegistrationPage', () => {
  let component: EditOtherBankPayeeRegistrationPage;
  let fixture: ComponentFixture<EditOtherBankPayeeRegistrationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditOtherBankPayeeRegistrationPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditOtherBankPayeeRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
