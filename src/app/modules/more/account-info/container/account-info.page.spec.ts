import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInfoPage } from './account-info.page';

describe('AccountInfoPage', () => {
  let component: AccountInfoPage;
  let fixture: ComponentFixture<AccountInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountInfoPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
