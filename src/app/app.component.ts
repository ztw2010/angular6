import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  styles: [
      `.ant-layout-content, .ant-layout-header {
      background-color: white;
    }

    .ant-layout-content {
      padding-bottom: 68px;
    }
    `
  ]
})
export class AppComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}
