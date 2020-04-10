import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NearbyOfferPage } from './nearby-offer.page';

describe('NearbyOfferPage', () => {
  let component: NearbyOfferPage;
  let fixture: ComponentFixture<NearbyOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NearbyOfferPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NearbyOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
