import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLostPage } from './card-lost.page';

describe('CardLostPage', () => {
  let component: CardLostPage;
  let fixture: ComponentFixture<CardLostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardLostPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardLostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
