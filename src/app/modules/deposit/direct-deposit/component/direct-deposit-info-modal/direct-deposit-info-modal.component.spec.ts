import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DirectDepositInfoModalComponent } from './direct-deposit-info-modal.component';

describe('DirectDepositInfoModalComponent', () => {
  let component: DirectDepositInfoModalComponent;
  let fixture: ComponentFixture<DirectDepositInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirectDepositInfoModalComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DirectDepositInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
