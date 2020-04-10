import { Adapter, IMember } from '../../core';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginForm extends LoginRequest {
  rememberUsername: boolean;
  rememberBiometric: boolean;
}

export interface LoginResponse {
  token: string;
  member?: IMember;
}

export class Login {
  token: string;

  constructor(creds: LoginResponse) {
    this.token = creds.token;
  }
}

export class LoginAdapter implements Adapter<LoginResponse, Login> {
  adapt(item: LoginResponse): Login {
    return new Login(item);
  } // end adapt
} // end class
