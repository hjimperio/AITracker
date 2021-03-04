import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-cards',
  templateUrl: './total-cards.component.html',
  styleUrls: ['./total-cards.component.css']
})
export class TotalCardsComponent implements OnInit {
  @Input() totalItem: number = 0;
  @Input() title: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
