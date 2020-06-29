import { NgModule } from '@angular/core';
import { UtilityUploadPage } from './container/utility-upload.page';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';

@NgModule({
  entryComponents: [UtilityUploadPage],
  imports: [SharedModule],
  providers: [FACADE_SERVICE],
  declarations: [UtilityUploadPage]
})
export class UtilityUploadPageModule {}
