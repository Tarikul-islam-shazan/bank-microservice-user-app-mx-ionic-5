import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditInvexPayeeRegistrationPage } from '../container/edit-invex-payee-registration.page';

describe('EditInvexPayeeRegistrationPage', () => {
  let component: EditInvexPayeeRegistrationPage;
  let fixture: ComponentFixture<EditInvexPayeeRegistrationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditInvexPayeeRegistrationPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditInvexPayeeRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
