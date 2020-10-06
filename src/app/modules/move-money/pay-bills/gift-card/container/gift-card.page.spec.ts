import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GiftCardPage } from './gift-card.page';

describe('GiftCardPage', () => {
  let component: GiftCardPage;
  let fixture: ComponentFixture<GiftCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GiftCardPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GiftCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
