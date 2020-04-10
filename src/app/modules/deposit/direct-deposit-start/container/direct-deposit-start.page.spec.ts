import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectDepositStartPage } from './direct-deposit-start.page';

describe('DirectDepositStartPage', () => {
  let component: DirectDepositStartPage;
  let fixture: ComponentFixture<DirectDepositStartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirectDepositStartPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectDepositStartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
