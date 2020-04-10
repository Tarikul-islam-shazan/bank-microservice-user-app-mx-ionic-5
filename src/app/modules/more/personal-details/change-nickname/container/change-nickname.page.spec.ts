import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeNicknamePage } from './change-nickname.page';

describe('ChangeNicknamePage', () => {
  let component: ChangeNicknamePage;
  let fixture: ComponentFixture<ChangeNicknamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeNicknamePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeNicknamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
