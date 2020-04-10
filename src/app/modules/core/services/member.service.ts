import { Injectable } from '@angular/core';
import { IMember } from '@app/core/models/dto/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  member: IMember;
  constructor() {}
  public setMember(member: IMember) {
    this.member = member;
  }
  public getCachedMember(): IMember {
    return this.member;
  }
}
