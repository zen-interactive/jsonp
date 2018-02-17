import { Component } from '@angular/core';
import { Jsonp, Response } from '@angular/http';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchItem } from './search-item';
import { SearchService } from './search.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchService]
})
export class AppComponent {
  public loading: boolean = false;
  public results: Observable<SearchItem[]>;
  public searchField: FormControl;

  constructor(private itunes: SearchService) {
  }

  ngOnInit() {
    this.searchField = new FormControl();
    this.results = this.searchField.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .do(_ => this.loading = true)
      .switchMap(term => this.itunes.search(term))
      .do(_ => this.loading = false)
  }
}
