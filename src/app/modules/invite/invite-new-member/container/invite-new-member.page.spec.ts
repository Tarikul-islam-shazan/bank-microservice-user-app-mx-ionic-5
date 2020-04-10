import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteNewMemberPage } from './invite-new-member.page';

describe('InvitePage', () => {
  let component: InviteNewMemberPage;
  let fixture: ComponentFixture<InviteNewMemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InviteNewMemberPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteNewMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
