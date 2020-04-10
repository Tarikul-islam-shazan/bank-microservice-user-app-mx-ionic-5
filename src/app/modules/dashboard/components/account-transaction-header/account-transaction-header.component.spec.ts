import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountTransactionHeaderComponent } from './account-transaction-header.component';

describe('AccountTransactionHeaderComponent', () => {
  let component: AccountTransactionHeaderComponent;
  let fixture: ComponentFixture<AccountTransactionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountTransactionHeaderComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountTransactionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
