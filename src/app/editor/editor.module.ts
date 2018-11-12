import {NgModule} from '@angular/core';
import {EditorComponent} from './editor.component';
import {SharedModule} from '../shared/shared.module';
import {EditableArticleResolverService} from './editable-article-resolver.service';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    EditorComponent
  ],
  providers: [
    EditableArticleResolverService
  ]
})
export class EditorModule {

}
