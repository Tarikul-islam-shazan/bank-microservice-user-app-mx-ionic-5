import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PAGES } from '@app/core';
import { SettingsPage } from './container/settings.page';
import { ChangeLanguagePage } from './change-language/container';
import { ContactPreferencesPage } from './contact-preferences/container';
import { VersionInfoPage } from './version-info/container';
import { SweepPage } from './sweep/container';
import { ChangePasswordPage } from './change-password/container';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path: 'change-language',
    data: { title: PAGES.CHANGE_LANGUAGE.NAME },
    component: ChangeLanguagePage
  },
  {
    path: 'contact-preferences',
    data: { title: PAGES.CONTACT_PREFERNECES.NAME },
    component: ContactPreferencesPage
  },
  {
    path: 'version-info',
    data: { title: PAGES.VERSION_INFO.NAME },
    component: VersionInfoPage
  },
  {
    path: 'sweep',
    data: { title: PAGES.SWEEP.NAME },
    component: SweepPage
  },
  {
    path: 'change-password',
    data: { title: PAGES.CHANGE_PASSWORD.NAME },
    component: ChangePasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsPageRoutingModule {}
