import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {


  @Input() user: any;
  @Output() click = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  clickDetails() {
    this.click.emit();
  }

}

