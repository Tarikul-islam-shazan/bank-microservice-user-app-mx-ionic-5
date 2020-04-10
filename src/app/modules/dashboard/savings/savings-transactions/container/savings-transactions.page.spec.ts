import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingsTransactionsPage } from './savings-transactions.page';

describe('SavingsTransactionsPage', () => {
  let component: SavingsTransactionsPage;
  let fixture: ComponentFixture<SavingsTransactionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SavingsTransactionsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingsTransactionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
