import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ArticleService} from '../../core/service/article.service';
import {Router} from '@angular/router';
import {UserService} from '../../core/service/user.service';
import {Article} from '../../core/model/article.model';
import {concatMap, tap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-favorite-button',
  styleUrls: ['./favorite-button.component.css'],
  templateUrl: './favorite-button.component.html'
})
export class FavoriteButtonComponent {

  @Input()
  article: Article;

  @Output()
  toggle = new EventEmitter<boolean>();

  isSubmitting = false;

  constructor(private articleService: ArticleService, private router: Router,
              private userService: UserService) {
  }

  toggleFavorite() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.pipe(concatMap((authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        // Favorite the article if it isn't favorited yet
        if (!this.article.favorited) {
          return this.articleService.favorite(this.article.slug)
            .pipe(tap(
              data => {
                this.isSubmitting = false;
                this.toggle.emit(true);
              },
              err => this.isSubmitting = false
            ));
          // Otherwise, unfavorite the article
        } else {
          return this.articleService.unFavorite(this.article.slug)
            .pipe(tap(
              data => {
                this.isSubmitting = false;
                this.toggle.emit(false);
              },
              err => this.isSubmitting = false
            ));
        }
      }
    )).subscribe();
  }


}
