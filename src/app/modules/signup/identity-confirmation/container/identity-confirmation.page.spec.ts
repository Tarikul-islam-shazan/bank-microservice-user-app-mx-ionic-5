import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IdentityConfirmationPage } from './identity-confirmation.page';

describe('IdentityConfirmationPage', () => {
  let component: IdentityConfirmationPage;
  let fixture: ComponentFixture<IdentityConfirmationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdentityConfirmationPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IdentityConfirmationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
