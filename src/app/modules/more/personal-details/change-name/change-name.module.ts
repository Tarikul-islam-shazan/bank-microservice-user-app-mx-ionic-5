import { ChangeNamePage } from './container/change-name.page';
import { ChangeNameRequiredDocumentsPageModule } from '../change-name-required-documents/change-name-required-documents.module';
import { FACADE_SERVICE } from './facade';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

@NgModule({
  entryComponents: [ChangeNamePage],
  imports: [SharedModule, ChangeNameRequiredDocumentsPageModule],
  providers: [FACADE_SERVICE],
  declarations: [ChangeNamePage]
})
export class ChangeNamePageModule {}
