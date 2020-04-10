import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { VerificationPage } from './container';
import { FACADE_SERVICE } from './facade';

const routes: Routes = [
  {
    path: '',
    component: VerificationPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [FACADE_SERVICE],
  declarations: [VerificationPage]
})
export class VerificationPageModule {}
