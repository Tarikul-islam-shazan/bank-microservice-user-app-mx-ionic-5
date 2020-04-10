import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VersionInfoPage } from './version-info.page';

describe('VersionInfoPage', () => {
  let component: VersionInfoPage;
  let fixture: ComponentFixture<VersionInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VersionInfoPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VersionInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
