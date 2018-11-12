import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Article} from '../core/model/article.model';
import {Observable} from 'rxjs/Observable';
import {ArticleService} from '../core/service/article.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ArticleResolve implements Resolve<Article> {

  constructor(private articleService: ArticleService, private router: Router) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.articleService.get(route.params['slug'])
      .pipe(catchError(error => this.router.navigateByUrl('/')));
  }
}
