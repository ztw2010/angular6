import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {JwtService} from './jwt.service';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user.model';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);

  public currentUser = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private apiService: ApiService, private jwtService: JwtService) {
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/users' + route, {user: credentials})
      .pipe(map(data => {
        this.setAuth(data.user);
        return data;
      }));
  }

  private setAuth(user: User) {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  update(user): Observable<User> {
    return this.apiService.put('/user', {user})
      .pipe(map(data => {
        this.currentUserSubject.next(data.user);
        return data.user;
      }));
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

}
