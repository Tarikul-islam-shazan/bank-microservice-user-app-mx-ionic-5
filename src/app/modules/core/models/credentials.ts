import { Adapter } from './adapter';
export interface CredentialsRequest {
  username: string;
  password: string;
}

export interface CredentialsResponse {
  token: string;
}

export class Credentials {
  token: string;

  constructor(creds: CredentialsResponse) {
    this.token = creds.token;
  }
}

export class CredentialsAdapter implements Adapter<CredentialsResponse, Credentials> {
  adapt(item: CredentialsResponse): Credentials {
    return new Credentials(item);
  } // end adapt
} // end class
