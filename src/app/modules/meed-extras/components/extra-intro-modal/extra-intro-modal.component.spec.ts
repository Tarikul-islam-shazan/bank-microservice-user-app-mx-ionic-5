import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExtraIntroModalComponent } from './extra-intro-modal.component';

describe('ExtraIntroModalComponent', () => {
  let component: ExtraIntroModalComponent;
  let fixture: ComponentFixture<ExtraIntroModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExtraIntroModalComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtraIntroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
