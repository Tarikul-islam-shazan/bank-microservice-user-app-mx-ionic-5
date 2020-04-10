import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTabsPage } from './dashboard-tabs.page';

describe('DashboardTabsPage', () => {
  let component: DashboardTabsPage;
  let fixture: ComponentFixture<DashboardTabsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardTabsPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
