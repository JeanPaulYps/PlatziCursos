import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Category} from '../models/category.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {
  }

  getAllCategories() {
    return this.http.get<Category[]>(`${environment.url_api}/categories/`);
  }

  createCategory(data: Partial<Category>) {
    return this.http.post<Category>(`${environment.url_api}/categories/`, data);
  }

  updateCategory(id: string, data: Partial<Category>) {
    return this.http.put<Category>(`${environment.url_api}/categories/${id}`, data);
  }

  getCategory(id: string) {
    return this.http.get<Category>(`${environment.url_api}/categories/${id}`);
  }

  checkCategory(name: string) {
    return this.getAllCategories().pipe(
      map((categories) => {
        return !categories.some(category => category.name === name);
      })
    ) ;
  }
}
