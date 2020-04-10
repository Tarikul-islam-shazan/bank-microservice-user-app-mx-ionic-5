import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPinPage } from './card-pin.page';

describe('CardPinPage', () => {
  let component: CardPinPage;
  let fixture: ComponentFixture<CardPinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardPinPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
