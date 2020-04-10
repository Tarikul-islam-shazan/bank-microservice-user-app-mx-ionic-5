import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MailCheckPage } from './mail-check.page';

describe('BillPayComponent', () => {
  let component: MailCheckPage;
  let fixture: ComponentFixture<MailCheckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MailCheckPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MailCheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
