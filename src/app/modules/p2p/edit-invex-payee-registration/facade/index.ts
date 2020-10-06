import { P2PService } from '@app/p2p/services/p2p.service';
import { EditInvexPayeeRegistrationFacade } from './edit-invex-payee-registration.facade';

export const FACADE_SERVICE = [EditInvexPayeeRegistrationFacade, P2PService];

export * from './edit-invex-payee-registration.facade';
