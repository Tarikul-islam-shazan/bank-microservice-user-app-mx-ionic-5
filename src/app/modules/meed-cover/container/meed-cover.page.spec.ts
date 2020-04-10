import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeedCoverPage } from './meed-cover.page';

describe('MeedCoverPage', () => {
  let component: MeedCoverPage;
  let fixture: ComponentFixture<MeedCoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MeedCoverPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeedCoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
