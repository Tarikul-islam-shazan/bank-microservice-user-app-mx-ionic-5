import { SettingsService } from '@app/core/services/settings.service';
import { AppUpgradeService } from '@app/core/services/app-upgrade.service';
export const configurationFactory = (settingService: SettingsService, appUpgradeService: AppUpgradeService) => {
  return async () => {
    await settingService.load();
    await appUpgradeService.load();
  };
};
