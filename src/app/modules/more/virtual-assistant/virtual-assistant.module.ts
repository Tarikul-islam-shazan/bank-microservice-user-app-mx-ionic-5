import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { VIRTUAL_ASSISTANT_PROVIDERS } from './services';
import { FACADE_SERVICE } from './facade';
import { VirtualAssistantPage } from './container/virtual-assistant.page';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { TimeAgoPipe } from 'time-ago-pipe';
const routes: Routes = [
  {
    path: '',
    component: VirtualAssistantPage
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [VirtualAssistantPage, SafeHtmlPipe, TimeAgoPipe],
  providers: [...VIRTUAL_ASSISTANT_PROVIDERS, ...FACADE_SERVICE]
})
export class VirtualAssistantPageModule {}
