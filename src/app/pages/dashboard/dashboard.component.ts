import { Component, OnInit } from '@angular/core';
import { AgePipe } from 'src/app/pipe/age.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  userList: any[] = [{
    name: 'Omkar',
    email: 'omkar@gmail.com',
    avatar: 'http://via.placeholder.com/640',
    address: 'Kashish Park, Thane',
    dob: 'Thu Dec 16 1995 23:23:19 GMT+0530 (IST)',
  },
  {
    name: 'Omkar Hande',
    email: 'omkar@hande.com',
    avatar: 'http://via.placeholder.com/640',
    address: 'Taloja, Navi Mumbai',
    dob: 'Thu Dec 17 1996 23:23:19 GMT+0530 (IST)',
  }]

  constructor(private age: AgePipe) { }

  ngOnInit(): void {
  }

}
