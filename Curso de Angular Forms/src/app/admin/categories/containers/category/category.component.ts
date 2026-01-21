import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {CategoryService} from '../../../../core/services/categories.service';
import {Category} from '../../../../core/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  form!: FormGroup;
  category: Category;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      const id = params.id;
      if (id) {
        this.getCategory(id);
      }
    });
  }

  createCategory(data: Category) {
    this.categoryService.createCategory(data).subscribe(response => {
      this.router.navigate(['./admin/categories']);
    });
  }

  updateCategory(data: Category) {
    this.categoryService.updateCategory(data.id, data).subscribe(response => {
      this.router.navigate(['./admin/categories']);
    });
  }

  getCategory(id: string) {
    this.categoryService.getCategory(id).pipe(take(1)).subscribe((data) => {
      console.log('Category data', data);
      this.category = data;
    });
  }
}
