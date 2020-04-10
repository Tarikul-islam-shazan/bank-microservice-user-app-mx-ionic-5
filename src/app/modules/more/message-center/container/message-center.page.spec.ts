import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessageCenterPage } from './message-center.page';

describe('MessageCenterPage', () => {
  let component: MessageCenterPage;
  let fixture: ComponentFixture<MessageCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageCenterPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessageCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
