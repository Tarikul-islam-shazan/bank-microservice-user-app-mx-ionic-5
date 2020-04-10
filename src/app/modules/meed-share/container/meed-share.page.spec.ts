import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeedSharePage } from './meed-share.page';

describe('MeedSharePage', () => {
  let component: MeedSharePage;
  let fixture: ComponentFixture<MeedSharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MeedSharePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeedSharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
