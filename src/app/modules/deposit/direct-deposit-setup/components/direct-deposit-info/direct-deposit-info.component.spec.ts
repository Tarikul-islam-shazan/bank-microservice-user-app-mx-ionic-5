import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DirectDepositInfoComponent } from './direct-deposit-info.component';

describe('DirectDepositInfoComponent', () => {
  let component: DirectDepositInfoComponent;
  let fixture: ComponentFixture<DirectDepositInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirectDepositInfoComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DirectDepositInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
