import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Logger } from './logger.service';
import { environment } from '@env/environment';
import { IRegisteredMember } from '../models/dto/member';
import { LoginRequest, LoginForm } from '@app/login/models/login';
import { map, tap } from 'rxjs/operators';
import { SettingsService } from '@app/core/services/settings.service';
import { UserSettings, SystemSettings, Menu, ContactSupport } from '@app/core/models/app-settings';
import { StaticDataCategories } from '@app/core/models/dto/static-data';
import { BiometricAuthenticationService } from '@app/core/services/biometric-authentication.service';
import { CardService } from './card.service';
import { SignUpService } from './sign-up-service.service';
const log = new Logger('LoginService');

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrlLogin = environment.serviceUrl + '/login';
  constructor(
    private http: HttpClient,
    private settingsService: SettingsService,
    private biometricAuthenticationService: BiometricAuthenticationService,
    private cardService: CardService,
    private signUpService: SignUpService
  ) {}

  login(formData: LoginForm): Observable<IRegisteredMember> {
    const { password, username }: LoginRequest = formData;
    return this.http
      .post<IRegisteredMember>(
        this.baseUrlLogin,
        { password, username },
        {
          observe: 'response'
        }
      )
      .pipe(
        tap((loginRespose: HttpResponse<IRegisteredMember>) => {
          this.setSettings(loginRespose, formData);
          this.setCardsData(loginRespose);
        }),
        map((mapResponse: HttpResponse<IRegisteredMember>) => {
          return mapResponse.body as IRegisteredMember;
        })
      );
  }

  setSettings(loginRespose: HttpResponse<IRegisteredMember>, userFormData: LoginForm) {
    // this property dictates the flow of direct deposit, as it is shared between signup and inside the app
    this.signUpService.dynamicDirectDepositFlowToLogin = false;
    const bankIdentifier = loginRespose.headers.get('MeedBankingClub-Bank-Identifier');
    const billPayProvider = loginRespose.headers.get('meedbankingclub-billpay-provider');
    const { configurationData } = loginRespose.body as IRegisteredMember;
    const { data: menuList } = configurationData.find(
      configurationObject => configurationObject.category === StaticDataCategories.SuppressFeature
    );
    const menus = menuList as Menu[];
    const { password, username }: LoginRequest = userFormData;

    const meedExtraInfoNotShow = this.settingsService.getSettings().userSettings.meedExtraInfoNotShow
      ? this.settingsService.getSettings().userSettings.meedExtraInfoNotShow
      : false;
    const userSettings: UserSettings = {
      disabledSignUp: true, // after successful login signup would be disabled
      bankIdentifier,
      username,
      billPayProvider,
      meedExtraInfoNotShow
    };
    const systemSettings: SystemSettings = { menus };
    this.settingsService.setUserSettings(userSettings);
    this.settingsService.setSystemSettings(systemSettings);
    if (userFormData.rememberBiometric) {
      this.biometricAuthenticationService.saveCredentialInSecureStorage({ password, username });
      userSettings.useBiometric = userFormData.rememberBiometric;
    }
  }

  setCardsData(loginRespose: HttpResponse<IRegisteredMember>) {
    const { configurationData } = loginRespose.body as IRegisteredMember;
    const contactSupport = configurationData.find(
      configurationObject => configurationObject.category === StaticDataCategories.Contacts
    );
    if (contactSupport) {
      const contactSupportData = contactSupport.data as ContactSupport;
      this.cardService.supportNumber = contactSupportData.phone;
    }
  }
}
