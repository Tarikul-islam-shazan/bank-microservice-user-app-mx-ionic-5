import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ForgotUsernamePage } from './forgot-username.page';

describe('ForgotUsernamePage', () => {
  let component: ForgotUsernamePage;
  let fixture: ComponentFixture<ForgotUsernamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotUsernamePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotUsernamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
