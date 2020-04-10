import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InviteInfoComponent } from './invite-info.component';

describe('InviteInfoComponent', () => {
  let component: InviteInfoComponent;
  let fixture: ComponentFixture<InviteInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InviteInfoComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InviteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
