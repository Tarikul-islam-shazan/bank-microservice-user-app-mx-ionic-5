import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UtilityUploadPage } from './utility-upload.page';

describe('UtilityUploadPage', () => {
  let component: UtilityUploadPage;
  let fixture: ComponentFixture<UtilityUploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UtilityUploadPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UtilityUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
