import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor() {
    // this.http.post('https://jsonplaceholder.typicode.com/posts', {"foo": "bar" }).subscribe(console.log)
  }
}
