import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CountryStateModalComponent } from './country-state-modal.component';

describe('CountryStateModalComponent', () => {
  let component: CountryStateModalComponent;
  let fixture: ComponentFixture<CountryStateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CountryStateModalComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CountryStateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
