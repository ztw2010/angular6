import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileArticlesComponent} from './profile/profile-articles.component';
import {ProfileFavoritesComponent} from './profile/profile-favorites-component';
import {ProfileResolve} from './profile/profile-resolve.service';
import {ArticleComponent} from './article/article.component';
import {ArticleResolve} from './article/article-resolve';
import {EditorComponent} from './editor/editor.component';
import {AuthGuardService} from './core/service/auth-guard.service';
import {EditableArticleResolverService} from './editor/editable-article-resolver.service';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'register',
    component: AuthComponent
  },
  {
    path: 'profile/:username',
    resolve: {
      profile: ProfileResolve
    },
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: ProfileArticlesComponent
      },
      {
        path: 'favorites',
        component: ProfileFavoritesComponent
      }
    ]
  },
  {
    path: 'article/:slug',
    component: ArticleComponent,
    resolve: {
      article: ArticleResolve
    }
  },
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'editor/:slug',
    component: EditorComponent,
    canActivate: [AuthGuardService],
    resolve: {
      article: EditableArticleResolverService
    }
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    component: AuthComponent
  }
];

export const appRouting = RouterModule.forRoot(routes);
