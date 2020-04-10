import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalPage } from './container/personal.page';
import { SharedModule } from '@app/shared';
import { SignupComponentsModule } from '@app/signup/components';
import { NgxMaskModule } from 'ngx-mask';
import { FACADE_SERVICE } from './facade';

const routes: Routes = [
  {
    path: '',
    component: PersonalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule, SignupComponentsModule, NgxMaskModule.forRoot()],
  providers: [FACADE_SERVICE],
  declarations: [PersonalPage]
})
export class PersonalPageModule {}
