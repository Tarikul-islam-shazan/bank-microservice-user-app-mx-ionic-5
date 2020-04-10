import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositThankYouPage } from './deposit-thank-you.page';

describe('DepositThankYouPage', () => {
  let component: DepositThankYouPage;
  let fixture: ComponentFixture<DepositThankYouPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DepositThankYouPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositThankYouPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
