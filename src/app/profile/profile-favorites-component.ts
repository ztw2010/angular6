import {Component, OnInit} from '@angular/core';
import {Profile} from '../core/model/profile.model';
import {ArticleListConfig} from '../core/model/article-list-config';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profile-favorites',
  templateUrl: './profile-favorites.component.html'
})
export class ProfileFavoritesComponent implements OnInit {

  favoritesConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };

  profile: Profile;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.parent.data.subscribe((data: { profile: Profile }) => {
      this.profile = data.profile;
      this.favoritesConfig.filters.favorited = this.profile.username;
    });
  }

}
