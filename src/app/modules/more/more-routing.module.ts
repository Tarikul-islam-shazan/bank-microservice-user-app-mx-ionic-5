import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PAGES } from '@app/core';
import { MorePage } from './container/more.page';

const routes: Routes = [
  {
    path: '',
    data: { title: PAGES.MORE_MENU.NAME },
    component: MorePage
  },
  {
    path: 'personal-details',
    data: { title: PAGES.PERSONAL_DETAILS.NAME },
    loadChildren: () => import('./personal-details/personal-details.module').then(m => m.PersonalDetailsModule)
  },
  {
    path: 'account-info',
    loadChildren: () => import('./account-info/account-info.module').then(m => m.AccountInfoPageModule)
  },
  {
    path: 'card',
    loadChildren: () => import('./card/card.module').then(m => m.CardPageModule)
  },
  {
    path: 'statements',
    loadChildren: () => import('./statements/statements.module').then(m => m.StatementsPageModule)
  },
  {
    path: 'contact-us',
    data: { title: PAGES.CONTACT_US.NAME },
    loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsPageModule)
  },
  {
    path: 'atm-finder',
    data: { title: PAGES.ATM_FINDER.NAME },
    loadChildren: () => import('./atm-finder/atm-finder.module').then(m => m.AtmFinderPageModule)
  },
  {
    path: 'settings',
    data: { title: PAGES.SETTINGS.NAME },
    loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'privacy-legal',
    data: { title: PAGES.PRIVACY_LEGAL.NAME },
    loadChildren: () => import('./privacy-legal/privacy-legal.module').then(m => m.PrivacyLegalPageModule)
  },
  {
    path: 'message-center',
    data: { title: PAGES.MESSAGES_CENTER.NAME },
    loadChildren: () => import('./message-center/message-center.module').then(m => m.MessageCenterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoreRoutingModule {}
