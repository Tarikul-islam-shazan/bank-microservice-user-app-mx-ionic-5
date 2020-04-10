import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScheduledTransfersPage } from './scheduled-transfers.page';

describe('ScheduledTransfersPage', () => {
  let component: ScheduledTransfersPage;
  let fixture: ComponentFixture<ScheduledTransfersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduledTransfersPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduledTransfersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
