import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { LogInSuccessPage } from './container';
import { FACADE_SERVICE } from './facade';

const routes: Routes = [
  {
    path: '',
    component: LogInSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [LogInSuccessPage],
  providers: [FACADE_SERVICE]
})
export class LogInSuccessPageModule {}
