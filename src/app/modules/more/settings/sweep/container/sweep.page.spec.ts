import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SweepPage } from './sweep.page';

describe('SweepPage', () => {
  let component: SweepPage;
  let fixture: ComponentFixture<SweepPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SweepPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SweepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
