import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ECheckPage } from './e-check.page';

describe('ECheckPage', () => {
  let component: ECheckPage;
  let fixture: ComponentFixture<ECheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ECheckPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ECheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
