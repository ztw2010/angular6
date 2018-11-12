import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProfileService} from '../../core/service/profile.service';
import {Router} from '@angular/router';
import {UserService} from '../../core/service/user.service';
import {Profile} from '../../core/model/profile.model';
import {concatMap, tap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-follow-button',
  styleUrls: ['./follow-button.component.css'],
  templateUrl: './follow-button.component.html'
})
export class FollowButtonComponent {

  constructor(private profileService: ProfileService, private router: Router, private userService: UserService) {
  }

  @Input()
  profile: Profile;

  isSubmitting = false;

  @Output()
  toggle = new EventEmitter<boolean>();

  toggleFollowing() {
    this.isSubmitting = true;
    this.userService.isAuthenticated.pipe(concatMap((authenticated) => {
      if (!authenticated) {
        this.router.navigateByUrl('/login');
        return of(null);
      }
      if (!this.profile.following) {
        return this.profileService.follow(this.profile.username)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            error => {
              this.isSubmitting = false;
            }
          ));
      } else {
        return this.profileService.unFollow(this.profile.username)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(false);
            },
            error => {
              this.isSubmitting = false;
            }
          ));
      }
    })).subscribe();
  }


}
