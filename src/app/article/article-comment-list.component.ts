import {Component, Input, OnInit} from '@angular/core';
import {CommentService} from '../core/service/comment.service';
import {Comment} from '../core/model/comment.model';
import {NzMessageService} from 'ng-zorro-antd';


@Component({
  selector: 'app-article-comment-list',
  templateUrl: './article-comment-list.component.html',
  styleUrls: ['./article-comment-list.component.css'],
})
export class ArticleCommentListComponent implements OnInit {

  @Input()
  slug: string;

  comments: Comment[];

  isLoading = false;

  isVisible = false;

  isOkLoading = false;

  deletComment: Comment;

  constructor(private commentService: CommentService, private messageService: NzMessageService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    if (this.slug) {
      this.commentService.getAll(this.slug)
        .subscribe(
          comment => {
            this.isLoading = false;
            this.comments = comment;
          },
          error => {
            this.isLoading = false;
          });
    }
  }

  public addComment(comment: Comment) {
    this.comments.unshift(comment);
  }

  handleCancel() {
    this.isVisible = false;
  }

  onDeleteComment(comment: Comment) {
    this.isVisible = true;
    this.deletComment = comment;
  }

  sure2Delete() {
    this.isOkLoading = true;
    this.commentService.destroy(this.deletComment.id, this.slug)
      .subscribe(
        data => {
          this.isVisible = false;
          this.isOkLoading = false;
          this.comments = this.comments.filter((item) => item !== this.deletComment);
        }, err => {
          this.isVisible = false;
          this.isOkLoading = false;
          this.messageService.create('error', JSON.stringify(err), {
            nzDuration: 3000
          });
        });
  }

}
