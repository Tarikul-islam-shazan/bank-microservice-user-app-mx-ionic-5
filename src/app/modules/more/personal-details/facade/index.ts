import { PersonalDetailsFacade } from './personal-details.facade';
import { PersonalDetailsState } from './personal-details.state';

export const SERVICE_PROVIDER = [PersonalDetailsFacade, PersonalDetailsState];

export * from './personal-details.facade';
export * from './personal-details.state';
