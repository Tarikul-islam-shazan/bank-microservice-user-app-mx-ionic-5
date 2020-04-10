import { Observable, BehaviorSubject } from 'rxjs';

export class Store<T> {
  protected state$: Observable<T>;
  // tslint:disable-next-line
  private _state$: BehaviorSubject<T>;
  protected constructor(initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }

  /**
   *  Used internally by the class to simplify getting the data held in the current
   *  state observable. This should not be used by a component as its not an observable
   * and state changes will not be streamed.
   *
   * @readonly
   * @type {T}
   * @memberof Store
   */
  public get state(): T {
    return this._state$.getValue();
  }

  /**
   * Pushes state to the observable so all clients listening for state changes can receive them.
   *
   * @param {T} nextState
   * @memberof Store
   */
  setState(nextState: T): void {
    this._state$.next(nextState);
  }
}
