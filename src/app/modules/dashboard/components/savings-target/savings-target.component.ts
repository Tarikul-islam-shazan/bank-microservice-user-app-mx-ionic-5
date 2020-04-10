import { Component, OnInit, Input } from '@angular/core';
import { ISavingTarget } from '@app/dashboard/models';

@Component({
  selector: 'mbc-savings-target',
  templateUrl: './savings-target.component.html',
  styleUrls: ['./savings-target.component.scss']
})
export class SavingsTargetComponent implements OnInit {
  @Input() monthlyTotalSave: number;
  @Input() monthlySavingTarget: number;
  @Input() progress: number;
  @Input() savingTarget: ISavingTarget;
  constructor() {}

  ngOnInit() {}
}
