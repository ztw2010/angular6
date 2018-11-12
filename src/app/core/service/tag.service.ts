import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Injectable()
export class TagService {

  constructor(private apiService: ApiService) {

  }

  getAll(): Observable<string[]> {
    return this.apiService.get('/tags')
      .pipe(map(data => {
        return data.tags;
      }));
  }
}
