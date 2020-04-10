import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentityVerificationPage } from './identity-verification.page';

describe('IdentityVerificationPage', () => {
  let component: IdentityVerificationPage;
  let fixture: ComponentFixture<IdentityVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdentityVerificationPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
