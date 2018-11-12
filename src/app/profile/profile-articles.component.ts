import {Component, OnInit} from '@angular/core';
import {ArticleListConfig} from '../core/model/article-list-config';
import {ActivatedRoute} from '@angular/router';
import {Profile} from '../core/model/profile.model';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html'

})
export class ProfileArticlesComponent implements OnInit {

  articlesConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };

  profile: Profile;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { profile: Profile }) => {
      this.profile = data.profile;
      this.articlesConfig.filters.author = this.profile.username;
    });
  }
}
