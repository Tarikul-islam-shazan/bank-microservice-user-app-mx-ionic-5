import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderService } from '../../core/services/header-service.service';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ISavingsGoal } from '@app/dashboard/models';
import { MemberService } from '@app/core/services/member.service';

@Injectable()
export class SavingGoalService {
  private savingGoalState: Partial<SavingsGoalState>;

  savingGoalUrl = environment.serviceUrl + '/savings-goals';
  constructor(private http: HttpClient, private headerService: HeaderService, private memberService: MemberService) {}

  fetchSavingGoal(): Observable<ISavingsGoal[]> {
    return this.http.get<ISavingsGoal[]>(this.savingGoalUrl, {
      headers: this.headerService.getSavingGoalHeader()
    });
  }

  postSavingGoal(savingGoal: Partial<ISavingsGoal>): Observable<ISavingsGoal> {
    return this.http.post<ISavingsGoal>(this.savingGoalUrl, savingGoal);
  }

  updateSavingGoal(savingGoal: Partial<ISavingsGoal>): Observable<ISavingsGoal> {
    return this.http.patch<ISavingsGoal>(this.savingGoalUrl + `/${savingGoal._id}`, savingGoal, {
      headers: this.headerService.getSavingGoalHeader()
    });
  }

  deleteSavingGoal(id: string): Observable<any> {
    return this.http.delete(this.savingGoalUrl + `/${id}`, {
      headers: this.headerService.getSavingGoalHeader()
    });
  }

  getSavingRate(): number {
    return 0.8;
  }

  setSavingGoal(partialSavingGoal: Partial<SavingsGoalState>) {
    this.savingGoalState = { ...this.savingGoalState, ...partialSavingGoal };
  }

  getSavingGoalState(): Partial<SavingsGoalState> {
    return this.savingGoalState;
  }

  getNewSavingGoalObject(): ISavingsGoal {
    const today = new Date();
    return {
      name: '',
      targetAmount: 10.0,
      yearOfSaving: 1,
      startDate: today,
      endDate: new Date(today.setFullYear(today.getFullYear() + 1)),
      memberId: this.memberService.getCachedMember()._id
    };
  }

  initializeSavingGoal(savingGoal?: ISavingsGoal) {
    if (savingGoal) {
      this.setSavingGoal({ savingsGoal: savingGoal, isNew: false });
    } else {
      this.setSavingGoal({ savingsGoal: this.getNewSavingGoalObject(), isNew: true });
    }
  }
}

export class SavingsGoalState {
  savingsGoal: Partial<ISavingsGoal>;
  isNew: boolean;
}
