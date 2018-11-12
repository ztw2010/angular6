import {Component, Input} from '@angular/core';
import {Errors} from '../core/model/errors.model';

@Component({
  selector: 'app-list-errors',
  styleUrls: ['./list-errors.component.css'],
  templateUrl: './app-list-errors.html'
})
export class ListErrorsComponent {

  formattedErrors: Array<string> = [];

  @Input()
  set errors(errorList: Errors) {
    if (errorList) {
      this.formattedErrors = Object.keys(errorList.errors || {})
        .map(key => `${key} ${errorList.errors[key]}`);
    }
  }

  get errorList() {
    return this.formattedErrors;
  }

}
