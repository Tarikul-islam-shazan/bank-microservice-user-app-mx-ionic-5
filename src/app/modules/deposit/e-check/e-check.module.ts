import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ECheckPage } from './container/e-check.page';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';
import { NgxMaskModule } from 'ngx-mask';

const routes: Routes = [
  {
    path: '',
    component: ECheckPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), NgxMaskModule.forRoot()],
  providers: [FACADE_SERVICE],
  declarations: [ECheckPage]
})
export class ECheckPageModule {}
