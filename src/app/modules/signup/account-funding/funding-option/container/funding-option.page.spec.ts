import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FundingOptionPage } from './funding-option.page';

describe('FundingOptionPage', () => {
  let component: FundingOptionPage;
  let fixture: ComponentFixture<FundingOptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FundingOptionPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FundingOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
