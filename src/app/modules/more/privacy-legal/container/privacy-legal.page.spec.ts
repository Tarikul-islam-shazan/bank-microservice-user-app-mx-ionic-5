import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrivacyLegalPage } from './privacy-legal.page';

describe('PrivacyLegalPage', () => {
  let component: PrivacyLegalPage;
  let fixture: ComponentFixture<PrivacyLegalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrivacyLegalPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyLegalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
