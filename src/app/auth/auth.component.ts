import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../core/service/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Errors} from '../core/model/errors.model';

@Component({
  selector: 'app-auth-page',
  styleUrls: ['auth.component.css'],
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  validateForm: FormGroup;

  authType = '';

  title = '';

  error: Errors = {errors: {}};

  isSubmitting = false;

  constructor(private fb: FormBuilder, private userService: UserService,
              private activateRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    this.activateRoute.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
    });
  }

  submitForm(): void {
    this.isSubmitting = true;
    this.error = {errors: {}};
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.userService.attemptAuth(this.authType, this.validateForm.value)
      .subscribe(
        data => {
          this.router.navigateByUrl('/');
        },
        error => {
          this.error = error;
          this.isSubmitting = false;
        }
      );
  }

}
