import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTopUpPayeePage } from './add-top-up-payee.page';

describe('AddTopUpPayeePage', () => {
  let component: AddTopUpPayeePage;
  let fixture: ComponentFixture<AddTopUpPayeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTopUpPayeePage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTopUpPayeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
