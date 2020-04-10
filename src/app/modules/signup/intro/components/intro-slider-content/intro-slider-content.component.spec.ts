import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IntroSliderContentComponent } from './intro-slider-content.component';

describe('IntroSliderContentComponent', () => {
  let component: IntroSliderContentComponent;
  let fixture: ComponentFixture<IntroSliderContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IntroSliderContentComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IntroSliderContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
