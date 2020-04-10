import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsConditionsPage } from './container/terms-conditions.page';
import { SharedModule } from '@app/shared';
import { SignupComponentsModule } from '@app/signup/components';
import { FACADE_SERVICE } from './facade';
const routes: Routes = [
  {
    path: '',
    component: TermsConditionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule, SignupComponentsModule],
  providers: [FACADE_SERVICE],
  declarations: [TermsConditionsPage]
})
export class TermsConditionsPageModule {}
