/**
 * Shared Component: <mbc-image-loader> </mbc-image-loader>
 * Details: Image loader component, if image has any error then title show instead of image
 * Date: February 3th, 2020
 * Developer: Sudipta <sudipta.ghosh@bs-23.net>
 */

// Usage:
// <mbc-image-loader
//       [src]="image link"
//       [title]="provide title, title will show if image has any error">
// </mbc-image-loader>

import { Component, Input } from '@angular/core';

@Component({
  selector: 'mbc-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent {
  _src: string;
  _title: string;
  isShowTitle = false;
  constructor() {}

  @Input() set src(val: string) {
    this._src = val !== undefined && val !== null ? val : '';
    if (!this._src) {
      this.isShowTitle = true;
    }
  }

  @Input() set title(val: string) {
    this._title = val !== undefined && val !== null ? val : '';
  }
  imageLoadError(): void {
    this.isShowTitle = true;
  }
}
