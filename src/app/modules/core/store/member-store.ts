import { Store } from './store';
import { Injectable } from '@angular/core';
import { IMember } from '../models/dto/member';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MemberStore extends Store<MemberState> {
  protected constructor() {
    super(new MemberState());
  }

  setMember(member: IMember): void {
    if (this.state.member._id) {
      member._id = this.state.member._id;
    }
    this.setState({
      ...this.state,
      member
    });
  }
  getMember$(): Observable<MemberState> {
    return this.state$;
  }
}
export class MemberState {
  member: IMember = {};
}
