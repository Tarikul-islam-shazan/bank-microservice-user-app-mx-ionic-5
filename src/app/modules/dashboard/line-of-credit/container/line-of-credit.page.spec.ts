import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineOfCreditPage } from './line-of-credit.page';

describe('LocTransactionsPage', () => {
  let component: LineOfCreditPage;
  let fixture: ComponentFixture<LineOfCreditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LineOfCreditPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineOfCreditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
