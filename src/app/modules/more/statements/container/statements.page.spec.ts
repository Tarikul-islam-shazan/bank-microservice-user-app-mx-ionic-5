import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementsPage } from './statements.page';

describe('StatementsPage', () => {
  let component: StatementsPage;
  let fixture: ComponentFixture<StatementsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatementsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
