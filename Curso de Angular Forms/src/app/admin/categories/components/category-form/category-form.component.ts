import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CategoryService} from 'src/app/core/services/categories.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize, switchMap, take} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {MyValidators} from '../../../../utils/validators';
import {Category} from '../../../../core/models/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  form!: FormGroup;
  isNew = true;

  @Input()
  set category(data: Category) {
    if (data) {
      this.isNew = false;
      const {name = '', image = ''} = data;
      this.form.patchValue({name, image});
    }
  }

  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private storage: AngularFireStorage,
    private activeRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)], MyValidators.validateCategory(this.categoryService)],
      image: ['', [Validators.required]]
    });
  }


  ngOnInit(): void {
  }


  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }

  save() {
    if (this.form.valid) {
      if (this.isNew) {
        this.create.emit(this.form.value);
      } else {
        this.update.emit(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  uploadFile(event: Event) {
    const image = (event.target as HTMLInputElement).files[0];
    const name = 'category.png';
    const ref = this.storage.ref(name);
    const task = this.storage.upload(name, image);

    task.snapshotChanges().pipe(
      finalize(() => {
        return EMPTY;
      }),
      switchMap(() => {
        return ref.getDownloadURL();
      })
    ).subscribe((urlImage) => {
      console.log('URL image', urlImage);
      this.imageField.setValue(urlImage);
    });
  }

}
