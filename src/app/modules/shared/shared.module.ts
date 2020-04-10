import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { SHARED_COMPONENTS } from './components';
import { SHARED_DIRECTIVES } from './directives/index';
import { SHARED_PIPES } from './pipes';
import { SHARED_SERVICES } from './services';

const SHARED_MODULES: any[] = [
  CommonModule,
  FormsModule,
  RouterModule,
  ReactiveFormsModule,
  TranslateModule,
  IonicModule
];

/**
 * SharedModule
 * Only for shared components, directives and pipes
 * Do not specify providers here
 * https://angular.io/docs/ts/latest/cookbook/ngmodule-faq.html#!#what-kinds-of-modules-should-i-have-and-how-should-i-use-them-
 */

@NgModule({
  entryComponents: [...SHARED_COMPONENTS],
  declarations: [...SHARED_COMPONENTS, ...SHARED_DIRECTIVES, ...SHARED_PIPES],
  imports: [...SHARED_MODULES],
  providers: [...SHARED_SERVICES],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  exports: [...SHARED_MODULES, ...SHARED_COMPONENTS, ...SHARED_DIRECTIVES, ...SHARED_PIPES]
})
export class SharedModule {}
