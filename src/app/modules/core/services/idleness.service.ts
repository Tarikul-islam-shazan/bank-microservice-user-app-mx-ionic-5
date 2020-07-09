import { Injectable } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Subscription } from 'rxjs';
import { Logger } from './logger.service';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { LogoutService, LogoutReason } from '@app/core/services/logout.service';
import { ModalService } from '@app/shared/services/modal.service';
const log = new Logger('IdlenessService');
@Injectable({
  providedIn: 'root'
})
export class IdlenessService {
  // sets an idle timeout of x seconds
  idelnessTimeout: number;
  // sets a timeout period of x seconds. after x seconds of inactivity, the user will be considered timed out.
  timeoutPeriod: number;
  // sets the ping interval to x seconds
  keepAlivePingInterval: number;

  onIdleEndSubscribe: Subscription = Subscription.EMPTY;
  onTimeoutSubscribe: Subscription = Subscription.EMPTY;
  onIdleStartSubscribe: Subscription = Subscription.EMPTY;
  onTimeoutWarningSubscribe: Subscription = Subscription.EMPTY;
  onKeepalivePingSubscribe: Subscription = Subscription.EMPTY;

  constructor(
    private baseAppIdelness: Idle,
    private keepalive: Keepalive,
    private logoutService: LogoutService,
    private router: Router,
    private modalService: ModalService
  ) {
    this.idelnessTimeout = environment.appIdleness.idelnessTimeout;
    this.timeoutPeriod = environment.appIdleness.timeoutPeriod;
    this.keepAlivePingInterval = environment.appIdleness.keepAlivePingInterval;
  }

  startBaseIdleTimeout() {
    this.stopBaseIdelTimeout();
    this.baseAppIdelness.setIdleName('baseappidelness');
    this.baseAppIdelness.setIdle(this.idelnessTimeout);
    this.baseAppIdelness.setTimeout(this.timeoutPeriod); // 1 * 60 = 60  for 10 mins its 600 seconds)
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.baseAppIdelness.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.keepalive.interval(this.keepAlivePingInterval);

    this.onIdleEndSubscribe = this.baseAppIdelness.onIdleEnd.subscribe(() => {
      // log.info('baseAppIdelness onIdleEnd');
    });
    this.onTimeoutSubscribe = this.baseAppIdelness.onTimeout.subscribe(() => {
      // log.info('baseAppIdelness onTimeout');
      this.appSessionTimeout();
    });
    this.onIdleStartSubscribe = this.baseAppIdelness.onIdleStart.subscribe(() => {
      // log.info('baseAppIdelness onIdleStart');
    });
    this.onTimeoutWarningSubscribe = this.baseAppIdelness.onTimeoutWarning.subscribe(countdown => {
      // log.info('baseAppIdelness onTimeoutWarning', countdown);
    });
    this.onKeepalivePingSubscribe = this.keepalive.onPing.subscribe(() => {
      // log.info('user keep alive ping');
    });

    this.baseAppIdelness.watch();
  }

  stopBaseIdelTimeout() {
    this.baseAppIdelness.stop();
    if (this.onIdleStartSubscribe) {
      this.onIdleEndSubscribe.unsubscribe();
      this.onTimeoutSubscribe.unsubscribe();
      this.onIdleStartSubscribe.unsubscribe();
      this.onTimeoutWarningSubscribe.unsubscribe();
      this.onKeepalivePingSubscribe.unsubscribe();
    }
  }

  async appSessionTimeout() {
    const modal = await this.modalService.getTop();
    if (modal) {
      modal.dismiss();
    }

    // Set logout reason: App Idelness session timeout and then redirect to login page
    this.logoutService.logoutReason = LogoutReason.AppSessionTimeOut;
    await this.router.navigateByUrl('login-user', { replaceUrl: true });
  }

  setIdelnessTimeout(inSeconds: number) {
    this.idelnessTimeout = inSeconds;
  }

  setTimeoutPeriod(inSeconds: number) {
    this.timeoutPeriod = inSeconds;
  }

  setkeepAlivePingInterval(inSeconds: number) {
    this.keepAlivePingInterval = inSeconds;
  }
}
