import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SavingsGoalPage } from './savings-goal.page';

describe('SavingGoalPage', () => {
  let component: SavingsGoalPage;
  let fixture: ComponentFixture<SavingsGoalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsGoalPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SavingsGoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
