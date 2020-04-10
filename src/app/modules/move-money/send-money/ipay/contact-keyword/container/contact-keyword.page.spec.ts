import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactKeywordPage } from './contact-keyword.page';

describe('ContactKeywordPage', () => {
  let component: ContactKeywordPage;
  let fixture: ComponentFixture<ContactKeywordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactKeywordPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactKeywordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
