import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchOffersPage } from './search-offers.page';

describe('SearchOfferPage', () => {
  let component: SearchOffersPage;
  let fixture: ComponentFixture<SearchOffersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchOffersPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchOffersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
