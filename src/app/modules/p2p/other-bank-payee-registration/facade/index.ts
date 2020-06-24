import { OtherBankPayeeRegistrationFacade } from './other-bank-payee-registration.facade';
import { P2PService } from '@app/p2p/services/p2p.service';
import { StaticDataService } from '@app/core';
export const FACADE_SERVICE = [OtherBankPayeeRegistrationFacade, P2PService, StaticDataService];
export * from './other-bank-payee-registration.facade';
