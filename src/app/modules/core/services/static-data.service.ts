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
      const { code: value, value: text, ...rest } = data;
      if (Object.keys(rest).length !== 0) {
        const subData = { ...rest };
        // we do not know what's the sub data object key but key will be string
        const subDataKey = (Object.keys(subData) as unknown) as string;
        const subDataMapping = this.mappingData(subData[subDataKey]);
        staticDataformat.push({
          value,
          text,
          [subDataKey]: subDataMapping
        });
      } else {
        staticDataformat.push({
          value,
          text
        });
      }
    });
    return staticDataformat;
  }

  get language(): string {
    return this.settingsService.getCurrentLocale().locale;
  }
}

export * from '@app/core/models/static-data';
