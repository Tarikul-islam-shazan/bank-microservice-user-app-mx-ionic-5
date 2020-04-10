import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BadgeEmailComponent } from './badge-email.component';

describe('BadgeEmailComponent', () => {
  let component: BadgeEmailComponent;
  let fixture: ComponentFixture<BadgeEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeEmailComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
