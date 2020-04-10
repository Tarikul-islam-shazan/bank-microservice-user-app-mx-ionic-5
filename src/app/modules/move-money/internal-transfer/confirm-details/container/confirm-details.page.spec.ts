import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmDetailsPage } from './confirm-details.page';

describe('ConfirmDetailsPage', () => {
  let component: ConfirmDetailsPage;
  let fixture: ComponentFixture<ConfirmDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDetailsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
