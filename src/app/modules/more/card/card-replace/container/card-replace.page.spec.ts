import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReplacePage } from './card-replace.page';

describe('CardReplacePage', () => {
  let component: CardReplacePage;
  let fixture: ComponentFixture<CardReplacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardReplacePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardReplacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
