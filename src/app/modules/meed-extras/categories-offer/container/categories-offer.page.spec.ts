import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoriesOfferPage } from './categories-offer.page';

describe('CategoriesOfferPage', () => {
  let component: CategoriesOfferPage;
  let fixture: ComponentFixture<CategoriesOfferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesOfferPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesOfferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
