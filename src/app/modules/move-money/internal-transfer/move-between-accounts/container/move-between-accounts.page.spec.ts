import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveBetweenAccountsPage } from './move-between-accounts.page';

describe('MoveBetweenAccountsPage', () => {
  let component: MoveBetweenAccountsPage;
  let fixture: ComponentFixture<MoveBetweenAccountsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoveBetweenAccountsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveBetweenAccountsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
