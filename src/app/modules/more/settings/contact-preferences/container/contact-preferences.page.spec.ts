import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactPreferencesPage } from './contact-preferences.page';

describe('ContactPreferencesPage', () => {
  let component: ContactPreferencesPage;
  let fixture: ComponentFixture<ContactPreferencesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactPreferencesPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactPreferencesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
