import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISegmentContainer } from '@app/dashboard/models';

@Component({
  selector: 'mbc-segment-container',
  templateUrl: './segment-container.component.html',
  styleUrls: ['./segment-container.component.scss']
})
export class SegmentContainerComponent implements OnInit {
  segmentItemList: ISegmentContainer[] = [];
  selectedItem: string;
  @Output() emitSegmentItem = new EventEmitter<string>();

  @Input() set segmentContainer(containerList: ISegmentContainer[]) {
    this.segmentItemList = containerList;
    this.selectedItem = this.getItemByIndex(0);
  }

  @Input() set selectIndex(index: number) {
    this.selectedItem = this.getItemByIndex(index);
  }
  constructor() {}

  ngOnInit() {}

  getItemByIndex(index: number): string {
    if (this.segmentItemList.length > 0) {
      const itemReference = this.segmentItemList[index].reference;
      this.emitSegmentItem.emit(itemReference);
      return itemReference;
    }
    return '';
  }

  tapToSelect(index: number) {
    this.selectedItem = this.getItemByIndex(index);
  }
}
