import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationOfferCardComponent } from './location-offer-card.component';

describe('OfferCardComponent', () => {
  let component: LocationOfferCardComponent;
  let fixture: ComponentFixture<LocationOfferCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationOfferCardComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationOfferCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
