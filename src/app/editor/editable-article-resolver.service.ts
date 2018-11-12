import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Article} from '../core/model/article.model';
import {Observable} from 'rxjs';
import {ArticleService} from '../core/service/article.service';
import {UserService} from '../core/service/user.service';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class EditableArticleResolverService implements Resolve<Article> {

  constructor(private articleService: ArticleService, private router: Router, private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.articleService.get(route.params['slug'])
      .pipe(map(article => {
          if (this.userService.getCurrentUser().username === article.author.username) {
            return article;
          } else {
            this.router.navigateByUrl('/');
            return '';
          }
        }),
        catchError(error => this.router.navigateByUrl('/'))
      );
  }
}
