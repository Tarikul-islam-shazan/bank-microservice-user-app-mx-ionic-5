import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { MemberService } from '@app/core/services/member.service';
import { IMember } from '@app/core/models/dto/member';
import { StaticDataCategory, IStaticData, IDropdownOption } from '@app/core/models/static-data';
import { SettingsService } from '@app/core/services/settings.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StaticDataService {
  private baseUrl = `${environment.serviceUrl}/meed`;
  constructor(
    private http: HttpClient,
    private memberService: MemberService,
    private settingsService: SettingsService
  ) {}

  get member(): IMember {
    return this.memberService.getCachedMember();
  }

  get(category: StaticDataCategory[]): Observable<{ [key: string]: IDropdownOption[] }> {
    const bank = this.member.bank;
    return this.http
      .get<any[]>(`${this.baseUrl}/static-data`, {
        params: { bank, category: category.join(','), subCategory: this.language }
      })
      .pipe(
        map((response: IStaticData[]) => {
          return this.mappingResponse(response);
        })
      );
  }

  mappingResponse(staticDataResponse: IStaticData[]): { [key: string]: IDropdownOption[] } {
    const mappingResult: { [key: string]: IDropdownOption[] } = {};
    staticDataResponse.forEach(staticData => {
      const category = staticData.category;
      mappingResult[category] = this.mappingData(staticData.data);
    });
    return mappingResult;
  }

  mappingData(staticData: { code: string; value: string }[]): IDropdownOption[] {
    const staticDataformat: IDropdownOption[] = [];
    staticData.forEach(data => {
      staticDataformat.push({
        value: data.code,
        text: data.value
      });
    });
    return staticDataformat;
  }

  get language(): string {
    return this.settingsService.getCurrentLocale().locale;
  }
}

export * from '@app/core/models/static-data';
