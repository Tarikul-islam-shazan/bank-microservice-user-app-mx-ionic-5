import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanIDPage } from './scan-id.page';

describe('ScanIDPage', () => {
  let component: ScanIDPage;
  let fixture: ComponentFixture<ScanIDPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScanIDPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanIDPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
