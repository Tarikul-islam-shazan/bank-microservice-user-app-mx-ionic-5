import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuburbModalComponent } from './suburb-modal.component';

describe('SubarbModalPage', () => {
  let component: SuburbModalComponent;
  let fixture: ComponentFixture<SuburbModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuburbModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuburbModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
