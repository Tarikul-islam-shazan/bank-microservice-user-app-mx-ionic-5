import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StepCounterComponent } from './step-counter/step-counter';

export const SHARED_COMPONENTS: any[] = [
  StepCounterComponent,
  AccountApprovedModalComponent,
  AccountDenyModalComponent,
  SuburbModalComponent
];
export * from './step-counter/step-counter';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AccountApprovedModalComponent } from './account-approved-modal';
import { AccountDenyModalComponent } from './account-deny-modal';
import { SuburbModalComponent } from './suburb-modal';
const SHARED_MODULES: any[] = [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule];
@NgModule({
  entryComponents: [SHARED_COMPONENTS],
  declarations: [SHARED_COMPONENTS],
  imports: [...SHARED_MODULES],
  exports: [...SHARED_MODULES, ...SHARED_COMPONENTS],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SignupComponentsModule {}
