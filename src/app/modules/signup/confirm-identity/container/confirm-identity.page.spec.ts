import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmIdentityPage } from './confirm-identity.page';

describe('ConfirmIdentityPage', () => {
  let component: ConfirmIdentityPage;
  let fixture: ComponentFixture<ConfirmIdentityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmIdentityPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmIdentityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
