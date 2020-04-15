import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FundingInformationPage } from './funding-information.page';

describe('FundingInformationPage', () => {
  let component: FundingInformationPage;
  let fixture: ComponentFixture<FundingInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FundingInformationPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FundingInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
