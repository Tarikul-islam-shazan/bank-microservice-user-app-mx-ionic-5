import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvexPayeeRegistrationPage } from './invex-payee-registration.page';

describe('InvexPayeeRegistrationPage', () => {
  let component: InvexPayeeRegistrationPage;
  let fixture: ComponentFixture<InvexPayeeRegistrationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InvexPayeeRegistrationPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvexPayeeRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
