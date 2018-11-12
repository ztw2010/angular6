import {Component, Input} from '@angular/core';
import {Article} from '../../core/model/article.model';
import {UserService} from '../../core/service/user.service';
import {Router} from '@angular/router';
import {ArticleService} from '../../core/service/article.service';
import {concatMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-article-list-item',
  styleUrls: ['./article-list-item.component.css'],
  templateUrl: './article-list-item.component.html'
})
export class ArticleListItemComponent {

  @Input()
  article: Article;

  isSubmitting = false;

  constructor(private userService: UserService, private router: Router, private articleService: ArticleService) {
  }


  get tagList(): string[] {
    if (this.article.tagList && this.article.tagList.length > 2) {
      return this.article.tagList.filter((currentValue, index, array) => {
        return index < 2;
      });
    }
    return [];
  }

  toggleFavorite() {
    this.isSubmitting = true;
    this.userService.isAuthenticated.pipe(concatMap((isAuthenticated) => {
      if (!isAuthenticated) {
        this.router.navigateByUrl('/login');
        return of(null);
      } else {
        if (this.article.favorited) {
          /**
           * tap用于窃听Observable的生命周期事件，而不会对Observable产生打扰(tap在subscribe之前执行,没有订阅,tap不执行)
           */
          return this.articleService.unFavorite(this.article.slug)
            .pipe(tap(
              data => {
                this.isSubmitting = false;
                this.article['favorited'] = false;
                this.article['favoritesCount']--;
              },
              error => {
                this.isSubmitting = false;
              }
            ));

        } else {
          return this.articleService.favorite(this.article.slug)
            .pipe(tap(
              data => {
                this.isSubmitting = false;
                this.article['favorited'] = true;
                this.article['favoritesCount']++;
              },
              error => {
                this.isSubmitting = false;
              }
            ));
        }
      }
    })).subscribe();
  }

}
