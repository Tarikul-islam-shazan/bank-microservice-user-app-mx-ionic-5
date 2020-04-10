import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillerDirectPage } from './biller-direct.page';

describe('BillerDirectPage', () => {
  let component: BillerDirectPage;
  let fixture: ComponentFixture<BillerDirectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillerDirectPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillerDirectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
