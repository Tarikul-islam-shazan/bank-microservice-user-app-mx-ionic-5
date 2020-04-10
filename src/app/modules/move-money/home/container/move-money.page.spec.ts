import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveMoneyPage } from './move-money.page';

describe('MoveMoneyPage', () => {
  let component: MoveMoneyPage;
  let fixture: ComponentFixture<MoveMoneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoveMoneyPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveMoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
