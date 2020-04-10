import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeatureOfferCardComponent } from './feature-offer-card.component';

describe('OfferCardComponent', () => {
  let component: FeatureOfferCardComponent;
  let fixture: ComponentFixture<FeatureOfferCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeatureOfferCardComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureOfferCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
