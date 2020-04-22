import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddressInformationPage } from './address-information.page';

describe('AddressInformationPage', () => {
  let component: AddressInformationPage;
  let fixture: ComponentFixture<AddressInformationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressInformationPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddressInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
