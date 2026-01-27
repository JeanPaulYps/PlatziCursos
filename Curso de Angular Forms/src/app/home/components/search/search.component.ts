import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {debounceTime, map} from 'rxjs/operators';

interface Response {
  total: number;
  total_pages: number;
  results: Record<string, any>;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchField = new FormControl();
  images: Record<string, any> = [];

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.searchField.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.getData(value);
    });
  }

  private getData(term: string) {
    const apiKey = '';
    this.http.get<Response>(`https://api.unsplash.com/search/photos?client_id=${apiKey}&query=${term}`).pipe(
      map(response => response.results)
    ).subscribe(data => {
      console.log(data);
      this.images = data;
    });
  }
}
