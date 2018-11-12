import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../core/model/user.model';
import {UserService} from '../core/service/user.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-settings-page',
  styleUrls: ['./settings.component.css'],
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  validateForm: FormGroup;

  user: User = {} as User;

  isSubmitting = false;

  constructor(private fb: FormBuilder, private userService: UserService,
              private router: Router, private messageService: NzMessageService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      image: [null],
      username: [null, [Validators.required]],
      bio: [null],
      email: [null, [Validators.pattern('/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/g')]],
      password: [null]
    });
    this.userService.currentUser.subscribe(user => {
      Object.assign(this.user, user);
      this.validateForm.patchValue(this.user);
    });
  }

  submitForm() {
    this.isSubmitting = true;
    Object.assign(this.user, this.validateForm.value);
    this.userService.update(this.user)
      .subscribe(
        updatedUser => {
          this.isSubmitting = false;
          this.router.navigateByUrl('/profile/' + updatedUser.username);
        }, error => {
          this.isSubmitting = false;
          this.messageService.create('error', JSON.stringify(error), {nzDuration: 3000});
        });
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

}
