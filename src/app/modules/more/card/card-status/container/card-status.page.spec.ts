import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStatusPage } from './card-status.page';

describe('CardStatusPage', () => {
  let component: CardStatusPage;
  let fixture: ComponentFixture<CardStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardStatusPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
