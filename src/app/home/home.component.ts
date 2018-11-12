import {Component, EventEmitter, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../core/service/user.service';
import {ArticleListConfig} from '../core/model/article-list-config';
import {TagService} from '../core/service/tag.service';
import {NzTabComponent} from 'ng-zorro-antd';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isAuthenticated = false;

  listConfig: ArticleListConfig = {
    type: 'all',
    filters: {}
  };

  tags: string[] = [];

  tagsLoading = false;

  currentTag = '';

  activeIndex = 1;

  tabSetData: Array<string> = ['Your Feed', 'Global Feed'];

  constructor(private router: Router, private userService: UserService, private tagService: TagService) {
  }


  ngOnInit(): void {

    this.userService.isAuthenticated
      .subscribe((authenticated) => {
        this.isAuthenticated = authenticated;
        if (authenticated) {
          this.activeIndex = 0;
          this.setListTo('feed');
        } else {
          this.activeIndex = 1;
          this.setListTo('all');
        }
      });

    this.tagsLoading = true;
    this.tagService.getAll()
      .subscribe(tags => {
        this.tags = tags;
        this.tagsLoading = false;
      });
  }

  private setListTo(type: string = '', filters: Object = {}) {
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.listConfig = {type: type, filters: filters};
  }

  selectTag(tag: string) {
    if (this.tabSetData.length === 2) {
      this.tabSetData.push(tag);
    } else {
      this.tabSetData.splice(2, 1, tag);
    }
    this.activeIndex = this.tabSetData.length - 1;
    if (tag !== this.currentTag) {
      this.currentTag = tag;
      this.setListTo('all', {tag: tag});
    }
  }

  onNzSelectedIndexChange(index: number) {
    if (this.tabSetData.length > 2 && index !== 2) {
      this.tabSetData.splice(2, 1);
      this.currentTag = '';
    }
    switch (index) {
      case 0:
        this.setListTo('feed');
        break;
      case 1:
        this.setListTo('all');
        break;
    }
  }
}
