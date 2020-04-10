import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeedTravelPage } from './meed-travel.page';

describe('MeedTravelPage', () => {
  let component: MeedTravelPage;
  let fixture: ComponentFixture<MeedTravelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MeedTravelPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeedTravelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
