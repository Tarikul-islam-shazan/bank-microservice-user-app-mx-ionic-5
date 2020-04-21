import { StorageService } from './storage.service';
import { NotificationService } from './notification.service';
import { SignUpService } from './sign-up-service.service';
import { LoadingService } from './loading.service';
import { TokenService } from './token.service';
import { SettingsService } from './settings.service';
import { CrashalyticsService } from './crashalytics.service';
import { LogglyLoggerService } from './loggly-logger.service';
import { RouteListenerService } from './route-listener.service';
import { IdlenessService } from './idleness.service';
import { JumioApiService } from './jumio-api.service';
import { ErrorService } from './error.service';
import { VirtualAssistantApiService } from './virtual-assistant-api.service';
import { InternalTransferService } from './internal-transfer.service';
import { AccountService } from './account.service';
import { CardService } from './card.service';
import { AppUpgradeService } from './app-upgrade.service';
import { UrbanAirshipService } from './urban-airship.service';
import { DepositService } from './deposit.service';
import { StatementsService } from './statements.service';
import { P2pService } from './p2p.service';
import { LogoutService } from './logout.service';
import { StaticDataService } from './static-data.service';
export const SERVICE_PROVIDERS: any[] = [
  SignUpService,
  LoadingService,
  NotificationService,
  TokenService,
  SettingsService,
  StorageService,
  CrashalyticsService,
  LogglyLoggerService,
  RouteListenerService,
  IdlenessService,
  JumioApiService,
  ErrorService,
  VirtualAssistantApiService,
  InternalTransferService,
  AccountService,
  CardService,
  AppUpgradeService,
  UrbanAirshipService,
  DepositService,
  StatementsService,
  P2pService,
  LogoutService,
  StaticDataService
];

export * from './notification.service';
export * from './sign-up-service.service';
export * from './logger.service';
export * from './loading.service';
export * from './token.service';
export * from './settings.service';
export * from './storage.service';
export * from './crashalytics.service';
export * from './route-listener.service';
export * from './idleness.service';
export * from './jumio-api.service';
export * from './error.service';
export * from './virtual-assistant-api.service';
export * from './internal-transfer.service';
export * from './account.service';
export * from './loggly-logger.service';
export * from './card.service';
export * from './app-upgrade.service';
export * from './urban-airship.service';
export * from './deposit.service';
export * from './statements.service';
export * from './member.service';
export * from './p2p.service';
export * from './logout.service';
export * from './static-data.service';
