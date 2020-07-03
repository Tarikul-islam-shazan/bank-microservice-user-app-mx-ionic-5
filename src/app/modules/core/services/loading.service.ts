import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { AnimationController, LoadingController } from '@ionic/angular';

/**
 * Used for LoadingController options parameter
 * @interface LoadingOptions
 * @property loadingDuration: Number of milliseconds to wait before dismissing the loading indicator.
 * @property loadingMessage: Optional text content to display in the loading indicator.
 * @property loadingCssClass: Additional classes to apply for custom CSS.
 */
export interface LoadingOptions {
  loadingDuration?: number;
  loadingMessage?: string;
  loadingCssClass?: string;
}

// Initilize default loadingControllerOptions from environment variable
const loadingDefaultOptions: Partial<LoadingOptions> = {
  loadingMessage: environment.loadingControllerOptions.message
};

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = false;
  loaderCounter = 0;
  loading: HTMLIonLoadingElement;

  constructor(public loadingController: LoadingController, public animationCtrl: AnimationController) {}

  async show(options: LoadingOptions = {}) {
    const leaveAnimation = (baseEl: any) => {
      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(baseEl.querySelector('ion-backdrop'))
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');
      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(400)
        .addAnimation([backdropAnimation])
        .direction('reverse');
    };
    this.loaderCounter = this.loaderCounter + 1;
    if (this.loaderCounter === 1) {
      this.isLoading = true;
      const { loadingDuration, loadingCssClass } = options;
      this.loading = await this.loadingController.create({
        duration: loadingDuration,
        cssClass: loadingCssClass ? loadingCssClass : 'loading-class',
        leaveAnimation
      });
      await this.loading.present();
      return this.loading;
    }
  }

  async dismiss() {
    if (this.loaderCounter > 0) {
      this.loaderCounter = this.loaderCounter - 1;
    }
    if (this.loaderCounter === 0) {
      this.isLoading = false;
      await this.loading.dismiss();
    }
  }
}
