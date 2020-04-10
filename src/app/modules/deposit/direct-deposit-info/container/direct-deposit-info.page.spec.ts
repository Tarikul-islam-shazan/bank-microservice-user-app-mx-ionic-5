import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectDepositInfoPage } from './direct-deposit-info.page';

describe('DirectDepositInfoPage', () => {
  let component: DirectDepositInfoPage;
  let fixture: ComponentFixture<DirectDepositInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirectDepositInfoPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectDepositInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
