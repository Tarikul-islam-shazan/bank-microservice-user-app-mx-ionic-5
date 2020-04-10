import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardSwapPage } from './card-swap.page';

describe('CardSwapPage', () => {
  let component: CardSwapPage;
  let fixture: ComponentFixture<CardSwapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardSwapPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardSwapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
