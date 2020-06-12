import { AccountRecoveryService } from '@app/core/services/account-recovery.service';
import { ITemporaryPassword, ITemporaryPasswordRequest } from '@app/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ForgotPasswordFacade {
  isSecurityQuesVisible = false;
  isUsernameAssigned = false;
  constructor(private accountRecoveryService: AccountRecoveryService) {}

  requestTemporaryPassword(answer: ITemporaryPasswordRequest): Observable<ITemporaryPassword> {
    return this.accountRecoveryService.requestTemporaryPassword(answer);
  }
}
