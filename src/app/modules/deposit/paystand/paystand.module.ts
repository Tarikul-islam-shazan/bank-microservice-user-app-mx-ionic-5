import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaystandPage } from './container/paystand.page';
import { SharedModule } from '@app/shared';
import { PaystandService } from './services';
import { FACADE_SERVICE } from './facade';
const routes: Routes = [
  {
    path: '',
    component: PaystandPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [PaystandPage],
  providers: [PaystandService, FACADE_SERVICE]
})
export class PaystandPageModule {}
