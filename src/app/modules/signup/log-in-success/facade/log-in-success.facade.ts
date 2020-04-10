import { Injectable } from '@angular/core';
import { IMember, SignUpService } from '@app/core';
/**
 * *Details: Facade added and get member from SignUpService
 *
 * @export
 * @class LogInSuccessFacade
 */
@Injectable()
export class LogInSuccessFacade {
  constructor(private signUpService: SignUpService) {}

  get userNickname(): string {
    return this.signUpService.member.nickname;
  }
}
