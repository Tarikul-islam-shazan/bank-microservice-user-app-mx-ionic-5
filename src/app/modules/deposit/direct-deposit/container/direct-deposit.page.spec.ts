import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectDepositPage } from './direct-deposit.page';

describe('DirectDepositPage', () => {
  let component: DirectDepositPage;
  let fixture: ComponentFixture<DirectDepositPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirectDepositPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectDepositPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
