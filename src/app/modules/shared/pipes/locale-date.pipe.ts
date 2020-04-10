import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { DateFormat } from '../../core/models/constants';

/**
 * @summary Localize Date Pipe
 *
 * @export
 * @class LocaleDatePipe
 * @extends {DatePipe}
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'localeDate',
  pure: false
})
export class LocaleDatePipe extends DatePipe implements PipeTransform {
  transform(value: any, format?: string): any {
    if (format) {
      return moment(value).format(format);
    } else {
      return moment(value).format(DateFormat.ShortDate);
    }
  }
}
