import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AtmFinderPage } from './atm-finder.page';

describe('AtmFinderPage', () => {
  let component: AtmFinderPage;
  let fixture: ComponentFixture<AtmFinderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AtmFinderPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AtmFinderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
