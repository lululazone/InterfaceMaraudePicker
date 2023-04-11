import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {


  name = "";
  quantity=0;

  added = false;
  constructor() { }

  ngOnInit(): void {
  }

}
