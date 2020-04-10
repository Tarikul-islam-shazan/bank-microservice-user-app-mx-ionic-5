import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { DashboardTabsPage } from './container/dashboard-tabs.page';
import { DashboardTabsPageRoutingModule } from './dashboard-tabs-routing.module';
@NgModule({
  imports: [SharedModule, DashboardTabsPageRoutingModule],
  declarations: [DashboardTabsPage]
})
export class DashboardTabsPageModule {}
