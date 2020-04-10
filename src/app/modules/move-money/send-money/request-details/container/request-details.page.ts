/**
 * Container: Send money request details page
 * Details: View the selected request fund details and action
 * Date: January 28, 2020
 * Developer: Sanitul <sanitul@bs-23.com>
 */
import { Component } from '@angular/core';
import { RequestDetailsFacade as Facade } from '@app/move-money/send-money/request-details/facade/facade';
@Component({
  selector: 'request-details-page',
  templateUrl: './request-details.page.html',
  styleUrls: ['./request-details.page.scss']
})
export class RequestDetailsPage {
  constructor(public facade: Facade) {}
}
