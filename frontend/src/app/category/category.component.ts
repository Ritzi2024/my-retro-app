import { NgForOf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  standalone: true,
  imports:[MatListModule, NgStyle, NgForOf],
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  categories = [
    {
      id: "1",
      title: "Finance",
      todoCount: 5
    },
    {
      id: "2",
      title: "Health",
      todoCount: 5
    },
    {
      id: "3",
      title: "Professional",
      todoCount: 15
    },
    {
      id: "4",
      title: "Random",
      todoCount: 4
    }
  ];

  totalCount = this.categories.reduce((total, category) => category.todoCount + total, 0);
}
