export interface OfferDetails {
  id: string | number;
  activated: boolean;
  title: string;
  merchant: string;
  image: string;
  shopType: string;
  tenWord: string;
  twentyWord: string;
  outsideLink: string;
  expiration: string;
  merchantId: string;
  requiresActivation: boolean;
  stores?: Store[];
  offerValue: string;
}

export interface Store {
  id: string | number;
  address: string;
  city: string;
  zip: string;
  lat: number;
  long: number;
  distance: number;
}
