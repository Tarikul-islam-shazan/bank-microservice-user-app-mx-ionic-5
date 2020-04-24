import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BeneficiaryInformationPage } from './container/beneficiary-information.page';
import { SignupComponentsModule } from '../components';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';
const routes: Routes = [
  {
    path: '',
    component: BeneficiaryInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule, SignupComponentsModule],
  providers: [FACADE_SERVICE],
  declarations: [BeneficiaryInformationPage]
})
export class BeneficiaryInformationPageModule {}
