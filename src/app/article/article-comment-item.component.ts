import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from '../core/model/comment.model';
import {UserService} from '../core/service/user.service';

@Component({
  selector: 'app-article-comment-item',
  styleUrls: ['./article-comment-item.component.css'],
  templateUrl: './article-comment-item.component.html'
})
export class ArticleCommentItemComponent implements OnInit {

  @Input()
  comment: Comment;

  @Output()
  deleteComment = new EventEmitter<Comment>();

  canModify = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.currentUser
      .subscribe(userData => {
        this.canModify = (userData.username === this.comment.author.username);
      });
  }

  deleComment() {
    this.deleteComment.emit(this.comment);
  }
}
