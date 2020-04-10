import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SavingsTargetComponent } from './savings-target.component';

describe('SAVTargetComponent', () => {
  let component: SavingsTargetComponent;
  let fixture: ComponentFixture<SavingsTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsTargetComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SavingsTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
