import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CancelTransferPage } from './cancel-transfer.page';

describe('CancelTransferPage', () => {
  let component: CancelTransferPage;
  let fixture: ComponentFixture<CancelTransferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CancelTransferPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CancelTransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
