import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VirtualAssistantPage } from './virtual-assistant.page';

describe('VirtualAssistantPage', () => {
  let component: VirtualAssistantPage;
  let fixture: ComponentFixture<VirtualAssistantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VirtualAssistantPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualAssistantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
