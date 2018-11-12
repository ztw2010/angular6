import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {HeaderComponent} from './shared/layout/header.component';
import {FooterComponent} from './shared/layout/footer.component';
import {HomeModule} from './home/home.module';
import {AuthModule} from './auth/auth.module';
import {appRouting} from './app.routing';
import {ProfileModule} from './profile/profile.module';
import {ArticleModule} from './article/article.module';
import {EditorModule} from './editor/editor.module';
import {SettingsModule} from './settings/settings.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    HomeModule,
    AuthModule,
    ProfileModule,
    ArticleModule,
    EditorModule,
    SettingsModule,
    appRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
