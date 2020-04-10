import { Component, OnInit, Input } from '@angular/core';
import { Category } from '@app/core';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {
  @Input() category: Category;
  constructor() {}

  ngOnInit() {}

  // rename the categories name for image load
  removeSpacefromName(catName) {
    const categoryName = catName.toLowerCase();
    const filteredName = categoryName.replace(/[^A-Z0-9]+/gi, '-');
    return filteredName;
  }
}
