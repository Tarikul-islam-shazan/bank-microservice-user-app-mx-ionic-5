import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './container/home.page';
import { FACADE_SERVICE } from './facade';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [SharedModule, HomePageRoutingModule],
  declarations: [HomePage],
  providers: [...FACADE_SERVICE]
})
export class HomePageModule {}
