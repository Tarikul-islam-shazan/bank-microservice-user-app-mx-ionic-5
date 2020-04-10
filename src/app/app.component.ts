import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CrashalyticsService, RouteListenerService, UrbanAirshipService } from '@app/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private crashalyticsService: CrashalyticsService,
    private routeListener: RouteListenerService,
    private urbanAirshipService: UrbanAirshipService
  ) {
    this.initializeApp();
    // this.listenRouteEvent(this.router);
  }

  initializeApp() {
    // required for app startup
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        this.platform.backButton.unsubscribe(); // Disable android back-button
      });
    }
  }
}
