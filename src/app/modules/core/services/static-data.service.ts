import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { MemberService } from '@app/core/services/member.service';
import { IMember } from '@app/core/models/dto/member';
import { StaticDataCategory, StaticDataSubCategory, IStaticData, IDropdownOption } from '@app/core/models/static-data';
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

  get(
    category: StaticDataCategory,
    subCategory: StaticDataSubCategory[]
  ): Observable<{ [key: string]: IDropdownOption }> {
    const bank = this.member.bank;
    return this.http
      .get<any[]>(`${this.baseUrl}/static-data`, {
        params: { bank, category, subCategory: subCategory.join(',') }
      })
      .pipe(
        map((response: IStaticData[]) => {
          return this.mappingResponse(response);
        })
      );
  }

  mappingResponse(staticdatas: IStaticData[]): { [key: string]: IDropdownOption } {
    const finalData = {};
    staticdatas.forEach(staticData => {
      const subCategory = staticData.subCategory;
      finalData[subCategory] = this.mappingData(staticData.data);
    });
    return finalData;
  }
  mappingData(staticData: { code: string; value: any }[]): IDropdownOption[] {
    const staticDataformat: IDropdownOption[] = [];
    staticData.forEach(data => {
      staticDataformat.push({
        value: data.code,
        text: data.value[this.language]
      });
    });
    return staticDataformat;
  }
  get language(): string {
    return this.settingsService.getCurrentLocale().locale;
  }
}

export * from '@app/core/models/static-data';
