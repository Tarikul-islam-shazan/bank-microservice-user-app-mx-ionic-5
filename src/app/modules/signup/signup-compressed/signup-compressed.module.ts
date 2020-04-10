import { CountryModalComponent } from './components/country-modal';
import { FACADE_SERVICE } from './facade/index';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared';
import { SignupCompressedPage } from './container/signup-compressed.page';

const routes: Routes = [
  {
    path: '',
    component: SignupCompressedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  providers: [...FACADE_SERVICE],
  declarations: [SignupCompressedPage, CountryModalComponent],
  entryComponents: [CountryModalComponent]
})
export class SignupCompressedPageModule {}
