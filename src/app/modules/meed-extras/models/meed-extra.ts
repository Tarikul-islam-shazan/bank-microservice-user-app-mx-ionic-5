export interface LocationOffer {
  offer: Offer;
  store: Store;
}

export interface Iindex {
  index: string;
}

interface Offer {
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
  offerValue: string;
}

interface Store {
  id: string | number;
  address: string;
  city: string;
  zip: string;
  lat: number;
  long: number;
  distance: number;
}

export interface OfferDetailsParams {
  xid: string;
  zipcode: string;
}

export interface ActiveOfferParams {
  offerId: string;
}

export interface AllOfferParams {
  sort: string;
  sortorder: string;
  per_page: string;
}

export interface CategoriesOfferParams {
  categoryid: string;
  page: string;
  per_page: string;
}
