import {NgModule} from '@angular/core';
import {SettingsComponent} from './settings.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule {

}
