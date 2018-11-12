import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/Observable';
import {Comment} from '../model/comment.model';
import {map} from 'rxjs/operators';

@Injectable()
export class CommentService {

  constructor(private apiService: ApiService) {
  }

  add(slug, payload): Observable<Comment> {
    return this.apiService.post(`/articles/${slug}/comments`, {comment: {body: payload}})
      .pipe(map(data => data.comment));
  }

  getAll(slug): Observable<Comment[]> {
    return this.apiService.get(`/articles/${slug}/comments`)
      .pipe(map(data => data.comments));
  }

  destroy(commentId, articleSlug) {
    return this.apiService.delete(`/articles/${articleSlug}/comments/${commentId}`);
  }


}
