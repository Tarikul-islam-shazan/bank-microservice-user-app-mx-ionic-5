import { InvexPayeeRegistrationFacade } from './invex-payee-registration.facade';
import { P2PService } from '@app/p2p/services/p2p.service';

export const FACADE_SERVICE = [InvexPayeeRegistrationFacade, P2PService];

export * from './invex-payee-registration.facade';
