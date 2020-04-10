import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InviteNewMemberConfirmPage } from '../invite-new-member-confirm.page';

describe('InviteNewMemberConfirmPage', () => {
  let component: InviteNewMemberConfirmPage;
  let fixture: ComponentFixture<InviteNewMemberConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InviteNewMemberConfirmPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InviteNewMemberConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
