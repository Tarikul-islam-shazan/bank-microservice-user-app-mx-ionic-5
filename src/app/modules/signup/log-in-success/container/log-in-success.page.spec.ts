import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInSuccessPage } from './log-in-success.page';

describe('LogInSuccessPage', () => {
  let component: LogInSuccessPage;
  let fixture: ComponentFixture<LogInSuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogInSuccessPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
