import { P2PService } from '@app/p2p/services/p2p.service';
import { EditOtherBankPayeeRegistrationFacade } from './edit-other-bank-payee-registration.facade';

export const FACADE_SERVICE = [EditOtherBankPayeeRegistrationFacade, P2PService];

export * from './edit-other-bank-payee-registration.facade';
