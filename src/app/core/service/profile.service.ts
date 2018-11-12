import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {Profile} from '../model/profile.model';
import {map} from 'rxjs/operators';

@Injectable()
export class ProfileService {

  constructor(private apiService: ApiService) {
  }

  get(username: string): Observable<Profile> {
    return this.apiService.get(`/profiles/${username}`)
      .pipe(map((data: { profile: Profile }) => data.profile));
  }

  follow(username: string): Observable<Profile> {
    return this.apiService.post(`/profiles/${username}/follow`);
  }

  unFollow(username: string): Observable<Profile> {
    return this.apiService.delete(`/profiles/${username}/follow`);
  }


}
