import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { AppPlatform } from '@app/core/util/app-platform';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ErrorService } from '@app/core/services/error.service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(
    private appPlatform: AppPlatform,
    private file: File,
    private fileOpener: FileOpener,
    private errorService: ErrorService,
    private transfer: FileTransfer,
    public toastController: ToastController
  ) {}

  async downloadFromUrl(XMLContent: IXMLContent) {
    if (this.appPlatform.isCordova()) {
      const writeDirectory = this.appPlatform.isIos()
        ? this.file.documentsDirectory
        : this.file.externalRootDirectory + '/Download';
      const fileName = XMLContent.xmlTitle.replace(/ /g, '_') + '.xml';
      if (this.appPlatform.isIos()) {
        this.downloadXML({ ...XMLContent, fileName, writeDirectory });
      } else if (this.appPlatform.isAndroid()) {
        if (await this.appPlatform.isExternalStorageAuthorized()) {
          this.downloadXML({ ...XMLContent, fileName, writeDirectory });
        } else {
          if (await this.appPlatform.requestExternalStoragePermission()) {
            this.downloadXML({ ...XMLContent, fileName, writeDirectory });
          }
        }
      }
    } else {
      this.downloadFileOnWeb({ ...XMLContent });
    }
  }

  private async downloadXML(XMLProps: IXMLProps) {
    await this.downloadFile(XMLProps).then(async baseDirectory => {
      if (this.appPlatform.isIos()) {
        this.openFileOnIOS(baseDirectory);
      } else if (this.appPlatform.isAndroid()) {
        await this.openFileOnAndroid();
      }
    });
  }

  private downloadFile(XMLProps: IXMLProps): Promise<boolean> {
    const fileTransfer: FileTransferObject = this.transfer.create();
    return fileTransfer.download(XMLProps.base64DataOrUrl, XMLProps.writeDirectory + XMLProps.fileName).then(
      baseDirectory => {
        return Promise.resolve(baseDirectory);
      },
      error => {
        this.errorService.sendError(error);
        return Promise.resolve(false);
      }
    );
  }

  private async downloadFileOnWeb(XMLProps: IXMLProps) {
    const fileName = XMLProps.xmlTitle.replace(/ /g, '_') + '.xml';
    const element = document.createElement('a');
    element.href = XMLProps.base64DataOrUrl;
    element.setAttribute('download', fileName);
    element.click();
  }

  private openFileOnIOS(baseDirectory): void {
    this.fileOpener
      .open(baseDirectory.toURL(), 'application/xml')
      .then()
      .catch(e => {});
  }

  private async openFileOnAndroid() {
    const toast = await this.toastController.create({
      message: 'Your file has been downloaded, please check the downlaod folder',
      duration: 2000
    });
    toast.present();
  }
}

export interface IXMLContent {
  base64DataOrUrl: string;
  xmlTitle: string;
}

interface IXMLProps extends IXMLContent {
  writeDirectory?: string;
  fileName?: string;
}
