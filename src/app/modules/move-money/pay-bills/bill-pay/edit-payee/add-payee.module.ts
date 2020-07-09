import { NgModule } from '@angular/core';
import { EditPayeePage } from './container/edit-payee.page';
import { SharedModule } from '@app/shared';
import { FACADE_SERVICE } from './facade';

@NgModule({
  exports: [EditPayeePage],
  entryComponents: [EditPayeePage],
  imports: [SharedModule],
  providers: [FACADE_SERVICE],
  declarations: [EditPayeePage]
})
export class EditPayeePageModule {}
