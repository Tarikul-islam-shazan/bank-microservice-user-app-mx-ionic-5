import { NgModule } from '@angular/core';
import { AddTopUpPayeePage } from './container/add-top-up-payee.page';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';

@NgModule({
  exports: [AddTopUpPayeePage],
  entryComponents: [AddTopUpPayeePage],
  imports: [SharedModule],
  providers: [FACADE_SERVICE],
  declarations: [AddTopUpPayeePage]
})
export class AddTopUpPayeePageModule {}
