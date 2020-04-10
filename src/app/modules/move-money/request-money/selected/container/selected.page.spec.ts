import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectedPage } from './selected.page';

describe('SelectedPage', () => {
  let component: SelectedPage;
  let fixture: ComponentFixture<SelectedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
