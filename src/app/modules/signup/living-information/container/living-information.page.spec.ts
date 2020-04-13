import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LivingInformationPage } from './living-information.page';

describe('LivingInformationPage', () => {
  let component: LivingInformationPage;
  let fixture: ComponentFixture<LivingInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LivingInformationPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LivingInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
