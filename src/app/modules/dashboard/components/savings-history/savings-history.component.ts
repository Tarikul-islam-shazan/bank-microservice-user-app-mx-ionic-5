import { Component, OnInit, Input } from '@angular/core';
import { ITransaction } from '@app/core';

@Component({
  selector: 'mbc-savings-history',
  templateUrl: './savings-history.component.html',
  styleUrls: ['./savings-history.component.scss']
})
export class SavingsHistoryComponent implements OnInit {
  @Input() transactions: ITransaction[] = [];
  constructor() {}

  ngOnInit() {}
}
