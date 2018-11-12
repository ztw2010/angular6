import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {concatMap, take, tap} from 'rxjs/operators';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.isAuthenticated.pipe(take(1), tap(isAuth => {
      if (!isAuth) {
        this.router.navigateByUrl('/');
      }
    }));
  }
}
