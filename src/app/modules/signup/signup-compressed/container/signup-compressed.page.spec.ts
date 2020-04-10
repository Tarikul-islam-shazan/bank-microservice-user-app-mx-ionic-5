import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SignupCompressedPage } from './signup-compressed.page';

describe('SignupCompressedPage', () => {
  let component: SignupCompressedPage;
  let fixture: ComponentFixture<SignupCompressedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupCompressedPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupCompressedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
