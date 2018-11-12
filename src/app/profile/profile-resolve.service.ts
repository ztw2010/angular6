import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Profile} from '../core/model/profile.model';
import {Observable} from 'rxjs/Observable';
import {ProfileService} from '../core/service/profile.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ProfileResolve implements Resolve<Profile> {

  constructor(private profileService: ProfileService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.profileService.get(route.params['username'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
