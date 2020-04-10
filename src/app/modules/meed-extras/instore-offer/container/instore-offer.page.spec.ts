import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstoreOfferPage } from './instore-offer.page';

describe('InstoreOfferPage', () => {
  let component: InstoreOfferPage;
  let fixture: ComponentFixture<InstoreOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstoreOfferPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstoreOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
