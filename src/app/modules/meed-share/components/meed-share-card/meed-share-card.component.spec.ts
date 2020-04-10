import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeedShareCardComponent } from './meed-share-card.component';

describe('MeedShareCardComponent', () => {
  let component: MeedShareCardComponent;
  let fixture: ComponentFixture<MeedShareCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MeedShareCardComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeedShareCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
