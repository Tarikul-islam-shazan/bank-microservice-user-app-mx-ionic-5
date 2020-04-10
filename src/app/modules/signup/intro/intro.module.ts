import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { IntroPage } from './container';
import { SHARED_INTRO_COMPONENTS } from './components';
import { FACADE_SERVICE } from './facade';

const routes: Routes = [
  {
    path: '',
    component: IntroPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [IntroPage, SHARED_INTRO_COMPONENTS],
  providers: [...FACADE_SERVICE]
})
export class IntroPageModule {}
