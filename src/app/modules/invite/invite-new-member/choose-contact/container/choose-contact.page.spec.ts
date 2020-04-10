/**
 * Feature: Unit Testing
 * Details: This Unit Testing file of choose from contacts modal.
 * Date: March 30, 2020
 * Developer: Rahadur Rahman <rahadur.rahman@brainstation23.com>
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChooseContactPage } from './choose-contact.page';

describe('ChooseContactPage', () => {
  let component: ChooseContactPage;
  let fixture: ComponentFixture<ChooseContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseContactPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
