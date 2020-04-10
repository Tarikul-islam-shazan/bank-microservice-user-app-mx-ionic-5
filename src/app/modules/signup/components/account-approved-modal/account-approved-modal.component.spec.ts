import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountApprovedModalComponent } from './account-approved-modal.component';

describe('AccountApprovedModalComponent', () => {
  let component: AccountApprovedModalComponent;
  let fixture: ComponentFixture<AccountApprovedModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountApprovedModalComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountApprovedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
