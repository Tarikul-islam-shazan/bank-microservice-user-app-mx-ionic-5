import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPayeeAddressPage } from './add-payee-address.page';

describe('AddPayeeAddressPage', () => {
  let component: AddPayeeAddressPage;
  let fixture: ComponentFixture<AddPayeeAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddPayeeAddressPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPayeeAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
