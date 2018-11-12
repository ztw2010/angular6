import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile.component';
import {SharedModule} from '../shared/shared.module';
import {ProfileArticlesComponent} from './profile-articles.component';
import {ProfileFavoritesComponent} from './profile-favorites-component';
import {ProfileResolve} from './profile-resolve.service';

@NgModule({
  imports: [SharedModule],
  declarations: [
    ProfileComponent,
    ProfileArticlesComponent,
    ProfileFavoritesComponent
  ],
  providers: [
    ProfileResolve
  ],
  exports: [
  ]
})
export class ProfileModule {

}
