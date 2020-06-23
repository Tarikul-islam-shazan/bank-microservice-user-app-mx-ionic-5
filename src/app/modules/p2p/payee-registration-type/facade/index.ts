import { PayeeRegistrationTypeFacade } from './payee-registration-type.facade';
import { P2PService } from '@app/p2p/services/p2p.service';
export const FACADE_SERVICE = [PayeeRegistrationTypeFacade, P2PService];
export * from './payee-registration-type.facade';
