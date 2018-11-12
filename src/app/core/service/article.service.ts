import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ArticleListConfig} from '../model/article-list-config';
import {Observable} from 'rxjs/Observable';
import {Article} from '../model/article.model';
import {HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class ArticleService {

  constructor(private apiService: ApiService) {
  }

  query(config: ArticleListConfig): Observable<{ articles: Article[], articlesCount: number }> {
    const params = {};
    Object.keys(config.filters)
      .forEach(key => {
        params[key] = config.filters[key];
      });
    const method = config.type === 'feed' ? '/feed' : '';
    return this.apiService.get('/articles' + method, new HttpParams({fromObject: params}));
  }

  favorite(slug): Observable<Article> {
    return this.apiService.post('/articles/' + slug + '/favorite');
  }

  unFavorite(slug): Observable<Article> {
    return this.apiService.delete('/articles/' + slug + '/favorite');
  }

  get(slug): Observable<Article> {
    return this.apiService.get(`/articles/${slug}`)
      .pipe(map(data => data.article));
  }

  save(article: Article): Observable<Article> {
    if (article.slug) {
      return this.apiService.put(`/articles/${article.slug}`, {article: article})
        .pipe(map(data => {
          return data.article;
        }));
    } else {
      return this.apiService.post('/articles/', {article: article})
        .pipe(map(data => {
          return data.article;
        }));
    }
  }

  destroy(slug) {
    return this.apiService.delete(`/articles/${slug}`);
  }

}
