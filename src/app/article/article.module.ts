import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {ArticleComponent} from './article.component';
import {ArticleResolve} from './article-resolve';
import {MarkdownPipe} from './markdown.pipe';
import {ArticleCommentItemComponent} from './article-comment-item.component';
import {ArticleCommentListComponent} from './article-comment-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ArticleComponent,
    MarkdownPipe,
    ArticleCommentListComponent,
    ArticleCommentItemComponent
  ],
  providers: [
    ArticleResolve
  ]
})
export class ArticleModule {

}
