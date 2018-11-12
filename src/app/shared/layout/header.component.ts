import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/service/user.service';
import {User} from '../../core/model/user.model';

@Component({
  selector: 'app-layout-header',
  styleUrls: ['./header.component.css'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  currentUser: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(userData => {
      this.currentUser = userData;
    });
  }

}
