import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeneficiaryInformationPage } from './beneficiary-information.page';

describe('BeneficiaryInformationPage', () => {
  let component: BeneficiaryInformationPage;
  let fixture: ComponentFixture<BeneficiaryInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BeneficiaryInformationPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeneficiaryInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
