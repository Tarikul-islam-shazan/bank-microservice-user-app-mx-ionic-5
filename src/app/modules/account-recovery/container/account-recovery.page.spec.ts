import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountRecoveryPage } from './account-recovery.page';

describe('AccountRecoveryPage', () => {
  let component: AccountRecoveryPage;
  let fixture: ComponentFixture<AccountRecoveryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountRecoveryPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountRecoveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
