import { NgModule } from '@angular/core';
import { AddPayeePage } from './container/add-payee.page';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';

@NgModule({
  exports: [AddPayeePage],
  entryComponents: [AddPayeePage],
  imports: [SharedModule],
  providers: [FACADE_SERVICE],
  declarations: [AddPayeePage]
})
export class AddPayeePageModule {}
