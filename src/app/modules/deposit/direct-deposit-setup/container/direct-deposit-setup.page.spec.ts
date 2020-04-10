import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DirectDepositSetupPage } from './direct-deposit-setup.page';

describe('DirectDepositSetupPage', () => {
  let component: DirectDepositSetupPage;
  let fixture: ComponentFixture<DirectDepositSetupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirectDepositSetupPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DirectDepositSetupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
