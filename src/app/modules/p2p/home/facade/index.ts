import { HomeP2PFacade } from './home.facade';
import { P2PService } from '@app/p2p/services/p2p.service';

export const FACADE_SERVICE = [HomeP2PFacade, P2PService];

export * from './home.facade';
