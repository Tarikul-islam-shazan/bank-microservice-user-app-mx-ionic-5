import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountSelectionPage } from './account-selection.page';

describe('AccountSelectionPage', () => {
  let component: AccountSelectionPage;
  let fixture: ComponentFixture<AccountSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountSelectionPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
