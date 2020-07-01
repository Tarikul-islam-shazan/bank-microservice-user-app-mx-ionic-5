import { Injectable } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from '@env/environment';
import { ModalService } from '@app/shared/services/modal.service';
import { AnalyticsService, AnalyticsEventTypes } from '@app/analytics';
import { PdfViewerService, IPDFContent } from '@app/core/services/pdf-viewer.service';
import { IMember, MemberService, SettingsService } from '@app/core';
import { CustomerService } from '@app/core/services/customer-service.service';

@Injectable()
export class MeedTravelFacade {
  constructor(
    private iab: InAppBrowser,
    private modalService: ModalService,
    private analytics: AnalyticsService,
    private pdfViewerService: PdfViewerService,
    private memberService: MemberService,
    private customerService: CustomerService,
    private settingService: SettingsService
  ) {}

  async bookTravel() {
    const member: IMember = this.memberService.member;
    this.customerService.getCustomerInfo().subscribe(customer => {
      const options = {
        CustomerEmail: {
          type: 'hidden',
          value: member.email
        },
        FirstName: {
          type: 'hidden',
          value: customer.firstName
        },
        LastName: {
          type: 'hidden',
          value: customer.lastName
        },
        MemberID: {
          type: 'hidden',
          value: member._id
        },
        lang: {
          type: 'hidden',
          value: this.settingService.getCurrentLocale().language
        },
        UniqueToken: {
          type: 'hidden',
          value: environment.meedTravel.token
        }
      };

      let script = 'let form = document.createElement("form");';
      script += 'let url = "https://meeddevsite.uat.mybookingplatform.com/en/user/autoLoginUser";';
      script += 'form.method="post";';
      script += 'form.setAttribute("action",url);';
      for (const field in options) {
        if (options.hasOwnProperty(field)) {
          script += 'var inputField = document.createElement("input");';
          script += 'inputField.setAttribute("type", "' + options[field].type + '");';
          script += 'inputField.setAttribute("name","' + field + '");';
          script += 'inputField.setAttribute("value","' + options[field].value + '");';
          script += 'form.appendChild(inputField);';
        }
      }
      script += 'document.body.appendChild(form);';
      script += 'form.submit();';

      const browser = this.iab.create(environment.meedTravel.url, '_blank', {
        toolbarcolor: '#435cdc'
      });

      browser.on('loadstop').subscribe(async event => {
        if (event.url.indexOf('autoLoginUser') !== -1) {
          browser.executeScript({ code: script }).then(data => {
            this.analytics.logEvent(AnalyticsEventTypes.MeedTravelPageVisited);
          });
        }
      });
    });
  }

  loadPdf() {
    const url = environment.meedPolicy.travelPolicy.url + environment.meedPolicy.travelPolicy.name;
    const pdfData: IPDFContent = {
      base64DataOrUrl: url,
      pdfTitle: 'MeedTravel Policy'
    };
    this.pdfViewerService.openPDFFromUrl(pdfData);
    this.analytics.logEvent(AnalyticsEventTypes.MeedTravelPdfViewed, { name: 'MeedTravel Policy' });
  }

  async book() {
    this.analytics.logEvent(AnalyticsEventTypes.ExternalSiteViewed, { name: 'MeedTravel' });
    const componentProps = {
      contents: [
        {
          title: 'meed-travel-page.main-page.modal-title',
          details: ['meed-travel-page.main-page.modal-description']
        }
      ],
      actionButtons: [
        {
          text: 'meed-travel-page.main-page.modal-btn',
          cssClass: 'white-button',
          handler: (event: any) => {
            componentProps.dismissModal();
            this.bookTravel();
          }
        }
      ],
      dismissModal: () => {}
    };
    await this.modalService.openInfoModalComponent({ componentProps });
  }
}
