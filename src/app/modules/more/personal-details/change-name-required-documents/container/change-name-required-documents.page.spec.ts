import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeNameRequiredDocumentsPage } from './change-name-required-documents.page';

describe('ChangeNameRequiredDocumentsPage', () => {
  let component: ChangeNameRequiredDocumentsPage;
  let fixture: ComponentFixture<ChangeNameRequiredDocumentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeNameRequiredDocumentsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeNameRequiredDocumentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
