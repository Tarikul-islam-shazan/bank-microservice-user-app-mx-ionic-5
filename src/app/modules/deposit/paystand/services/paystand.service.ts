import { Injectable } from '@angular/core';
import { AppPlatform, LoadingService } from '@app/core';
import { environment } from '@env/environment';
import { IPaystandOptions, IPayStandTransactionInfo } from '../models';
declare var psCheckout: any;
@Injectable({
  providedIn: 'root'
})
export class PaystandService {
  gblS3Path = 'https://s3.amazonaws.com/prod-meed-www/';
  externalCSSLink = this.gblS3Path + 'paystand_style_for_registerd_user.css';
  viewFunds: string;
  viewport: any = null;
  preloadedAmount: number;

  constructor(private appPlatform: AppPlatform, private loadingService: LoadingService) {
    if (this.appPlatform.isIos()) {
      this.viewport = document.querySelector('meta[name=viewport]');
      this.viewport.setAttribute('content', 'viewport-fit=cover, initial-scale=1.0');
    }
  }

  /**
   * This function initializes the paystand page according to the parameters from different pages
   *
   * @param {IPaystandOptions} paystandOption
   * @param {*} callback
   * @memberof PaystandService
   */
  initilize(paystandOption: IPaystandOptions, callback) {
    this.preloadedAmount = paystandOption.amount;
    if (typeof psCheckout === 'undefined') {
      this.psCheckoutInitilize(false, paystandOption, callback);
    } else {
      this.psCheckoutInitilize(true, paystandOption, callback);
    }
  }

  /**
   * This function sets up the iFrame to load the paystand accordingly
   *
   * @param {boolean} [initScript=false]
   * @param {IPaystandOptions} paystandOption
   * @param {*} callback
   * @memberof PaystandService
   */
  psCheckoutInitilize(initScript: boolean = false, paystandOption: IPaystandOptions, callback) {
    const fileref = document.createElement('script');
    fileref.setAttribute('type', 'text/javascript');
    fileref.setAttribute('src', environment.paystand.scriptSource);
    fileref.setAttribute('id', 'ps_checkout');
    fileref.setAttribute('ps-env', environment.paystand.environment);
    fileref.setAttribute('ps-paymentAmount', this.preloadedAmount.toString());
    fileref.setAttribute('ps-fixedAmount', paystandOption.enableAmountInputField);
    fileref.setAttribute('ps-mode', 'embed');
    fileref.setAttribute('ps-viewLogo', 'hide');
    fileref.setAttribute('ps-externalCss', this.externalCSSLink);
    fileref.setAttribute('ps-publishableKey', environment.paystand.publishableKey);
    fileref.setAttribute('ps-containerId', paystandOption.elementID);
    this.loadingService.show();
    fileref.onload = () => {
      if (psCheckout) {
        if (initScript) {
          psCheckout.initialized = false;
          psCheckout.initScript();
        }
        psCheckout.onReady(() => {
          psCheckout.onceLoaded(() => {
            const content = document.getElementsByClassName('ps-checkout-content') as HTMLCollectionOf<HTMLElement>;
            content[0].style.width = '100%';
            psCheckout.showCheckout();
            this.loadingService.dismiss();
          });
          psCheckout.onError(() => {
            // do nothing
            this.loadingService.dismiss();
          });
          psCheckout.reboot({
            env: environment.paystand.environment,
            viewLogo: 'hide',
            viewFunds: this.viewFunds,
            paymentAmount: this.preloadedAmount,
            fixedAmount: paystandOption.enableAmountInputField,
            externalCss: this.externalCSSLink,
            publishableKey: environment.paystand.publishableKey,
            containerId: paystandOption.elementID
          });
          psCheckout.checkoutFlow = data => {
            const paystandResponse: IPayStandTransactionInfo = {
              transactionReference: data.response.data.id,
              date: data.response.data.created,
              sourceType: data.response.data.sourceType,
              currency: data.response.data.currency
            };
            callback(paystandResponse);
          };
        });
        psCheckout.onComplete(data => {
          psCheckout.hideCheckout();
        });
      }
    };
    document.getElementsByTagName('ion-content')[0].appendChild(fileref);
  }
  viewportReset() {
    if (this.appPlatform.isIos()) {
      this.viewport.setAttribute(
        'content',
        'viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
      );
    }
  }
}
