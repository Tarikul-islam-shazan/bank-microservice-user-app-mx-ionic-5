import { Injectable } from '@angular/core';
import * as semanticVersioning from '@env/semantic-versioning.json';

@Injectable()
export class VersionInfoFacade {
  version: string;
  releaseDate: string;
  constructor() {
    this.version = semanticVersioning.appVersion;
    this.releaseDate = semanticVersioning.releaseDate;
  }
}
