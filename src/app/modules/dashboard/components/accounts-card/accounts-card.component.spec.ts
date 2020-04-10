import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountsCardComponent } from './accounts-card.component';

describe('AccountsCardComponent', () => {
  let component: AccountsCardComponent;
  let fixture: ComponentFixture<AccountsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountsCardComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
