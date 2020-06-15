import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { ContactUsPage } from './container/contact-us.page';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsFacade } from '@app/more/contact-us/facade/facade';

const routes: Routes = [
  {
    path: '',
    component: ContactUsPage
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [ContactUsPage],
  providers: [ContactUsFacade]
})
export class ContactUsPageModule {}
