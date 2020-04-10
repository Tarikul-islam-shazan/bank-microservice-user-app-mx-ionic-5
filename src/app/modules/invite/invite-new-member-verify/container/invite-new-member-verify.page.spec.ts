import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InviteNewMemberVerifyPage } from './invite-new-member-verify.page';

describe('InviteNewMemberConfirmPage', () => {
  let component: InviteNewMemberVerifyPage;
  let fixture: ComponentFixture<InviteNewMemberVerifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InviteNewMemberVerifyPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InviteNewMemberVerifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
