import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPayeePage } from './edit-payee.page';

describe('EditPayeePage', () => {
  let component: EditPayeePage;
  let fixture: ComponentFixture<EditPayeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditPayeePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPayeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
