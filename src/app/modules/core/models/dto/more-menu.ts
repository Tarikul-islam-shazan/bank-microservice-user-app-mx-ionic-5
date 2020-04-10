export interface IBankAtm {
  bank?: string;
  distance?: number;
  locationType?: string;
  city?: string;
  phoneNumber?: string;
  state?: string;
  zipCode?: string;
  streetAddress?: string;
  locationName?: string;
  serviceType?: string;
  hours?: IAtmHours[];
  location?: ICoordinates;
  mapUrl?: string;
}

export interface IAtmHours {
  lobbyHours: string;
  dayOfWeek: string;
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface IBankAtmRequestParams {
  distance: number;
  locationType: string;
  unitOfMeasure: UnitOfMeasureType;
  latitude?: number;
  longitude?: number;
  address?: string;
}

export enum UnitOfMeasureType {
  Imperial = 'Imperial',
  Metric = 'Metric'
}

export interface IDocumentRequestData {
  dateOfBirth: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  oldName: string;
  reason: string;
  requiredDocument: string;
  salutation: string;
  frontIdImage: Blob;
  backIdImage: Blob;
  documentImage: Blob;
}

export enum DocumentImageType {
  FrontImage = 'frontIdImage',
  BackImage = 'backIdImage',
  DocumentImage = 'documentImage'
}
