import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnlineOfferPage } from './online-offer.page';

describe('OnlineOfferPage', () => {
  let component: OnlineOfferPage;
  let fixture: ComponentFixture<OnlineOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OnlineOfferPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnlineOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
