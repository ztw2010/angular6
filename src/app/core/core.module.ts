import {NgModule} from '@angular/core';
import {UserService} from './service/user.service';
import {ApiService} from './service/api.service';
import {JwtService} from './service/jwt.service';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpTokenInterceptor} from './interceptors/http.token.interceptor';
import {ArticleService} from './service/article.service';
import {TagService} from './service/tag.service';
import {ProfileService} from './service/profile.service';
import {CommentService} from './service/comment.service';
import {AuthGuardService} from './service/auth-guard.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    ApiService,
    UserService,
    JwtService,
    ArticleService,
    TagService,
    ProfileService,
    CommentService,
    AuthGuardService,
  ]
})
export class CoreModule {

}
