import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GovernmentDisclosurePage } from './government-disclosure.page';

describe('GovernmentDisclosurePage', () => {
  let component: GovernmentDisclosurePage;
  let fixture: ComponentFixture<GovernmentDisclosurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GovernmentDisclosurePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GovernmentDisclosurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
