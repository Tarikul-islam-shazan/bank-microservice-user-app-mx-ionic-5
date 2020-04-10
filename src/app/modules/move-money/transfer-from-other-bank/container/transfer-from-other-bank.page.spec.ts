import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransferFromOtherBankPage } from './transfer-from-other-bank.page';

describe('TransferFromOtherBankPage', () => {
  let component: TransferFromOtherBankPage;
  let fixture: ComponentFixture<TransferFromOtherBankPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransferFromOtherBankPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferFromOtherBankPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
