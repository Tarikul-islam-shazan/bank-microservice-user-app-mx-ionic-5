import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneralInformationPage } from './general-information.page';

describe('GeneralInformationPage', () => {
  let component: GeneralInformationPage;
  let fixture: ComponentFixture<GeneralInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralInformationPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
