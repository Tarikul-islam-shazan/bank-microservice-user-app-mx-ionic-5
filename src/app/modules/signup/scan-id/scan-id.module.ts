import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { ScanIDPage } from './container/scan-id.page';
import { SCANID_PROVIDERS } from './services';
import { FACADE_SERVICE } from './facade';
import { SignupComponentsModule } from '@app/signup/components';

const routes: Routes = [
  {
    path: '',
    component: ScanIDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SignupComponentsModule, SharedModule],
  declarations: [ScanIDPage],
  providers: [...SCANID_PROVIDERS, ...FACADE_SERVICE]
})
export class ScanIDPageModule {}
