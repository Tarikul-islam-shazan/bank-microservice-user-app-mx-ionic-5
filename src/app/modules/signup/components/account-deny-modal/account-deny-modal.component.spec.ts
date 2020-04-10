import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountDenyModalComponent } from './account-deny-modal.component';

describe('AccountDenyModalComponent', () => {
  let component: AccountDenyModalComponent;
  let fixture: ComponentFixture<AccountDenyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountDenyModalComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountDenyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
