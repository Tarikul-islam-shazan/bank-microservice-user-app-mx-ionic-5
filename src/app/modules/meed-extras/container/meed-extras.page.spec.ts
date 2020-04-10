import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeedExtrasPage } from './meed-extras.page';

describe('MeedExtrasPage', () => {
  let component: MeedExtrasPage;
  let fixture: ComponentFixture<MeedExtrasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MeedExtrasPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeedExtrasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
