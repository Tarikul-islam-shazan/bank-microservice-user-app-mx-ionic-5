import { ChangeNicknamePage } from './container/change-nickname.page';
import { FACADE_SERVICE } from './facade';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [SharedModule],
  providers: [FACADE_SERVICE],
  declarations: [ChangeNicknamePage],
  entryComponents: [ChangeNicknamePage]
})
export class ChangeNicknamePageModule {}
