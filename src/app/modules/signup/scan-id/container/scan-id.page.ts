/**
 * Container: ScanId using Jumio
 * Details: To verify User ID
 * Date: March 06, 2020
 * Developer: Utpaul <Utpal.Sarker@brainstation23.com>
 */
import { Component } from '@angular/core';
import { Logger } from '@app/core/services';
import { ScanIDFacade } from '@app/signup/scan-id/facade';
const log = new Logger('ScanIDPage');
@Component({
  selector: 'app-scan-id',
  templateUrl: './scan-id.page.html',
  styleUrls: ['./scan-id.page.scss']
})
export class ScanIDPage {
  constructor(public scanIDFacade: ScanIDFacade) {}
}
