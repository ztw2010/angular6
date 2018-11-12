import {Component, OnInit} from '@angular/core';
import {Profile} from '../core/model/profile.model';
import {User} from '../core/model/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../core/service/user.service';
import {concatMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-profile-page',
  styleUrls: ['./profile.component.css'],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
  }

  profile: Profile;

  currentUser: User;

  isUser: boolean;

  ngOnInit(): void {
    this.route.data.pipe(concatMap((data: { profile: Profile }) => {
      this.profile = data.profile;
      return this.userService.currentUser.pipe(tap(
        (userData: User) => {
          this.currentUser = userData;
          this.isUser = (this.currentUser.username === this.profile.username);
        }
      ));
    })).subscribe();
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }

  selectTab(tabIndex: number) {
    switch (tabIndex) {
      case 0:
        this.router.navigateByUrl(`/profile/${this.profile.username}`);
        break;
      case 1:
        this.router.navigateByUrl(`/profile/${this.profile.username}/favorites`);
        break;
    }
  }

}
