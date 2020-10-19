import { Directive, Input, HostListener } from '@angular/core';
import { AnalyticsService } from '../../analytics/services/analytics.service';
import { Logger } from '../../core/services/logger.service';

const logger = new Logger('EventTrackingDirective');

@Directive({
  selector: '[appEventTracking]'
})
export class EventTrackingDirective {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Input('appEventTracking') eventData: any;

  @HostListener('click', ['$event']) onClick($event) {
    logger.info(`event data: ${JSON.stringify(this.eventData)}`);
    this.analyticsService.logEvent(this.eventData.eventName, this.eventData.params);
  }
}
