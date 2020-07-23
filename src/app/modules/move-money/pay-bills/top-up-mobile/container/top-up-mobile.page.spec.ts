import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopUpMobilePage } from './top-up-mobile.page';

describe('TopUpMobilePage', () => {
  let component: TopUpMobilePage;
  let fixture: ComponentFixture<TopUpMobilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopUpMobilePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopUpMobilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
