import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PAGES } from '@app/core';
import { InitializeRouteGuard } from '@app/core/routeGuards';
const routes: Routes = [
  { path: '', redirectTo: 'login-user', pathMatch: 'full' },
  {
    path: 'signup',
    loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'login-user',
    canActivate: [InitializeRouteGuard],
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
    data: { title: PAGES.LOGIN_USER.NAME }
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard-tabs/dashboard-tabs.module').then(m => m.DashboardTabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('@app/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'move-money',
    loadChildren: () => import('./modules/move-money/move-money.module').then(m => m.MoveMoneyModule)
  },
  {
    path: 'more',
    data: { title: PAGES.MORE.NAME },
    loadChildren: () => import('./modules/more/more.module').then(m => m.MoreModule)
  },
  {
    path: 'meed-extras',
    loadChildren: () => import('./modules/meed-extras/meed-extras.module').then(m => m.MeedExtrasPageModule)
  },
  {
    path: 'meed-share',
    data: { title: PAGES.MEED_SHARE.NAME },
    loadChildren: () => import('./modules/meed-share/meed-share.module').then(m => m.MeedSharePageModule)
  },
  {
    path: 'meed-cover',
    data: { title: PAGES.MEED_COVER.NAME },
    loadChildren: () => import('./modules/meed-cover/meed-cover.module').then(m => m.MeedCoverPageModule)
  },
  {
    path: 'meed-travel',
    data: { title: PAGES.MEED_TRAVEL.NAME },
    loadChildren: () => import('./modules/meed-travel/meed-trave.module').then(m => m.MeedTravelPageModule)
  },
  {
    path: 'account-recovery',
    loadChildren: () =>
      import('./modules/account-recovery/account-recovery.module').then(m => m.AccountRecoveryPageModule)
  },
  {
    path: 'p2p',
    loadChildren: () => import('./modules/p2p/p2p.module').then(m => m.P2PModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
