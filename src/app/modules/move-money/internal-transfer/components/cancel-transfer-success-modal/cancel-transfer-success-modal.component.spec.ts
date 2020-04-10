import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CancelTransferSuccessModalComponent } from './cancel-transfer-success-modal.component';

describe('CancelTransferSuccessModalComponent', () => {
  let component: CancelTransferSuccessModalComponent;
  let fixture: ComponentFixture<CancelTransferSuccessModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CancelTransferSuccessModalComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CancelTransferSuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
