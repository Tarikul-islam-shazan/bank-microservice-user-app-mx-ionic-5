import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendGiftCardPage } from './send-gift-card.page';

describe('TopUpMobilePage', () => {
  let component: SendGiftCardPage;
  let fixture: ComponentFixture<SendGiftCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SendGiftCardPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendGiftCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
