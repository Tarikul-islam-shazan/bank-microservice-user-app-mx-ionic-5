import { NgModule } from '@angular/core';
import { ChangeNameRequiredDocumentsPage } from './container/change-name-required-documents.page';
import { SharedModule } from '@app/shared';
import { RequiredDocumentsFacade } from './facade/change-name-required-documents.facade';
import { OtpModalComponentModule } from '@app/shared/components/otp-modal/otp-modal.module';

@NgModule({
  imports: [SharedModule, OtpModalComponentModule],
  entryComponents: [ChangeNameRequiredDocumentsPage],
  providers: [RequiredDocumentsFacade],
  declarations: [ChangeNameRequiredDocumentsPage]
})
export class ChangeNameRequiredDocumentsPageModule {}
