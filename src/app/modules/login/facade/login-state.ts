import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginState {
  // not much to do here but showing an update flag as example of how to implement for other pages/modules
  private updating = new BehaviorSubject<boolean>(false);
  private updating$ = this.updating.asObservable();

  isUpdating$(): Observable<boolean> {
    return this.updating$;
  }

  setUpdating(isUpdating: boolean): void {
    this.updating.next(isUpdating);
  }
}
