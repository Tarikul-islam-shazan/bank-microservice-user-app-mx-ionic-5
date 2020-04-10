import { ChangeEmailPage } from './container/change-email.page';
import { FACADE_SERVICE } from './facade';
import { NgModule } from '@angular/core';
import { PersonalDetailsState } from '../facade';
import { SharedModule } from '@app/shared';

@NgModule({
  entryComponents: [ChangeEmailPage],
  imports: [SharedModule],
  providers: [FACADE_SERVICE, PersonalDetailsState],
  declarations: [ChangeEmailPage]
})
export class ChangeEmailPageModule {}
