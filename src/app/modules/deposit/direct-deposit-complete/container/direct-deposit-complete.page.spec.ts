import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectDepositCompletePage } from './direct-deposit-complete.page';

describe('DirectDepositCompletePage', () => {
  let component: DirectDepositCompletePage;
  let fixture: ComponentFixture<DirectDepositCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirectDepositCompletePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectDepositCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
