import { NgModule } from '@angular/core';
import { AtmFinderPage } from './container/atm-finder.page';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';
import { AgmCoreModule } from '@agm/core';
import { FACADE_SERVICE } from './facade';
import { Geolocation } from '@ionic-native/geolocation/ngx';

const routes: Routes = [
  {
    path: '',
    component: AtmFinderPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCWqVSO6q6dVoEpu5EZ50KrmsCzrW4IVfo' })
  ],
  providers: [FACADE_SERVICE, Geolocation],
  declarations: [AtmFinderPage]
})
export class AtmFinderPageModule {}
