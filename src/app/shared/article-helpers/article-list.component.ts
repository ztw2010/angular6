import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from '../../core/service/article.service';
import {ArticleListConfig} from '../../core/model/article-list-config';
import {Article} from '../../core/model/article.model';

@Component({
  selector: 'app-article-list',
  styleUrls: ['article-list.component.css'],
  templateUrl: './article-list.component.html',
})
export class ArticleListComponent implements OnInit, OnDestroy {

  limit = 10;

  query: ArticleListConfig;

  currentPage = 1;

  loading = false;

  results: Article[] = [];

  totalPage = 0;

  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    console.log('ArticleListComponent ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('ArticleListComponent ngOnDestroy');
  }

  runQuery() {
    this.loading = true;
    this.results = [];
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = this.limit * (this.currentPage - 1);
    }
    this.articleService.query(this.query)
      .subscribe(data => {
        this.loading = false;
        this.results = data.articles;
        this.totalPage = data.articlesCount;
      });
  }

  setPageTo(pageNumber: number) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  changePageSize(pageSize: number) {
    this.limit = pageSize;
    this.currentPage = 1;
    this.runQuery();
  }
}
