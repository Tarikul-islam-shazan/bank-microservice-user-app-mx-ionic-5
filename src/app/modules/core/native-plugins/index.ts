import { IonicNativePlugin } from '@ionic-native/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { SecureStorage } from '@ionic-native/secure-storage/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Device } from '@ionic-native/device/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
export const NATIVE_PLUGINS: IonicNativePlugin[] = [
  Diagnostic,
  FirebaseX,
  FingerprintAIO,
  OpenNativeSettings,
  SecureStorage,
  InAppBrowser,
  FileOpener,
  // tslint:disable-next-line: deprecation
  FileTransfer,
  File,
  DocumentViewer,
  CallNumber,
  Camera,
  Device
];
