import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ListErrorsComponent} from './list-errors.component';
import {ShowAuthedDirective} from './show-authed.directive';
import {ArticleListComponent} from './article-helpers/article-list.component';
import {ArticleListItemComponent} from './article-helpers/article-list-item.component';
import {FollowButtonComponent} from './buttons/follow-button.component';
import {FavoriteButtonComponent} from './buttons/favorite-button.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    NgZorroAntdModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    ListErrorsComponent,
    ShowAuthedDirective,
    ArticleListComponent,
    ArticleListItemComponent,
    FollowButtonComponent,
    FavoriteButtonComponent
  ],
  declarations: [
    ListErrorsComponent,
    ShowAuthedDirective,
    ArticleListComponent,
    ArticleListItemComponent,
    FollowButtonComponent,
    FavoriteButtonComponent
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}],
})
export class SharedModule {

}
