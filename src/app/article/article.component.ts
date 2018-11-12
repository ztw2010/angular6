import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Article} from '../core/model/article.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommentService} from '../core/service/comment.service';
import {ArticleCommentListComponent} from './article-comment-list.component';
import {UserService} from '../core/service/user.service';
import {User} from '../core/model/user.model';
import {ArticleService} from '../core/service/article.service';

@Component({
  selector: 'app-article-page',
  styleUrls: ['./article.component.css'],
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {

  article: Article;

  commentForm: FormGroup;

  isSubmitting = false;

  commentFormErrors = {};

  canModify: boolean;

  currentUser: User;

  isDeleting = false;

  @ViewChild('commentListComponent')
  commentListComponent: ArticleCommentListComponent;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder,
              private commentService: CommentService, private userService: UserService,
              private articleService: ArticleService, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { article: Article }) => {
      this.article = data.article;
    });
    this.commentForm = this.fb.group({
      commentBody: ['', Validators.required]
    });
    this.userService.currentUser.subscribe(userData => {
      this.currentUser = userData;
      this.canModify = (this.currentUser.username === this.article.author.username);
    });
  }

  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }

  onToggleFavorite(favorite: boolean) {
    this.article.favorited = favorite;
    if (favorite) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }

  addComment() {
    for (const i in this.commentForm.controls) {
      this.commentForm.controls[i].markAsDirty();
      this.commentForm.controls[i].updateValueAndValidity();
    }
    this.isSubmitting = true;
    this.commentService.add(this.article.slug, this.commentForm.controls['commentBody'].value)
      .subscribe(
        comment => {
          this.commentListComponent.addComment(comment);
          this.commentForm.controls['commentBody'].reset('');
          this.isSubmitting = false;
        },
        err => {
          this.isSubmitting = false;
          this.commentFormErrors = err;
        }
      );
  }

  deleteArticle() {
    this.isDeleting = true;
    this.articleService.destroy(this.article.slug)
      .subscribe(success => {
        this.router.navigateByUrl('/');
      });
  }

}
