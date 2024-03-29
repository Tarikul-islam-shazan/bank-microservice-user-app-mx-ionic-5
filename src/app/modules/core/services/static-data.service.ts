import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { MemberService } from '@app/core/services/member.service';
import { IMember } from '@app/core/models/dto/member';
import {
  StaticDataCategory,
  IStaticData,
  IDropdownOption,
  StaticDataProperties,
  StaticData,
  ISupportStaticData
} from '@app/core/models/static-data';
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

  get(category: StaticDataCategory): Observable<{ [key: string]: IDropdownOption[] }> {
    const bank = this.member.bank;
    return this.http
      .get<any[]>(`${this.baseUrl}/static-data`, {
        params: { bank, category, subCategory: this.language }
      })
      .pipe(
        map((staticData: IStaticData[]) => {
          const [first] = staticData;
          const { data: staticDataProperties } = first;
          return this.mappingResponse(staticDataProperties);
        })
      );
  }

  /**
   * process mapping from staticdata properties to IDropdownOption properties
   * @param {{
   *     [key: string]: StaticDataProperties[];
   *   }} staticDataProperties
   * @returns {{ [key: string]: IDropdownOption[] }}
   * @memberof StaticDataService
   */
  mappingResponse(staticDataProperties: {
    [key: string]: StaticDataProperties[];
  }): { [key: string]: IDropdownOption[] } {
    const mappingResult: { [key: string]: IDropdownOption[] } = {};
    for (const property in staticDataProperties) {
      if (staticDataProperties.hasOwnProperty(property)) {
        mappingResult[property] = this.mappingData(staticDataProperties[property]);
      }
    }
    return mappingResult;
  }

  /**
   * mapping static data code value to dropdown text, value and sub-category dropdown
   * @param {StaticDataProperties[]} staticData
   * @returns {IDropdownOption[]}
   * @memberof StaticDataService
   */
  mappingData(staticData: StaticDataProperties[]): IDropdownOption[] {
    const staticDataformat: IDropdownOption[] = [];
    staticData.forEach(data => {
      const { code: value, value: text, ...rest } = data;
      if (Object.keys(rest).length !== 0) {
        const subData = { ...rest };
        // we do not know what's the sub data object key but key will be string
        const subDataKey = (Object.keys(subData) as unknown) as string;
        let subDataMapping = subData[subDataKey];
        if (Array.isArray(subData[subDataKey])) {
          subDataMapping = this.mappingData(subData[subDataKey]);
        }
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

  getBankSupportNumber(): Observable<string> {
    const bank = this.member.bank;
    return this.http
      .get<any>(`${this.baseUrl}/static-data`, {
        params: { bank, category: StaticDataCategory.Contacts, subCategory: StaticData.Support }
      })
      .pipe(
        map((staticData: ISupportStaticData[]) => {
          const staticSupportData: ISupportStaticData = staticData.find(
            data => data.subCategory === StaticData.Support
          );
          const supportNumber = staticSupportData ? staticSupportData.data.phone : '';
          return supportNumber;
        })
      );
  }
}

export * from '@app/core/models/static-data';
