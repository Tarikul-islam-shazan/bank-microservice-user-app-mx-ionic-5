import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownModalComponent } from './dropdown-modal.component';

describe('DropdownModalPage', () => {
  let component: DropdownModalComponent;
  let fixture: ComponentFixture<DropdownModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
