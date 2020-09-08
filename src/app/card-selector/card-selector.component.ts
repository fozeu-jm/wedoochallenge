import { Component, OnInit, Input } from '@angular/core';
import { cardService } from './card-service.service';

@Component({
  selector: 'app-card-selector',
  templateUrl: './card-selector.component.html',
  styleUrls: ['./card-selector.component.css']
})
export class CardSelectorComponent implements OnInit {
  valueNumber:number;
  constructor() { }

  ngOnInit(): void {}

  onValueSelect(value:number){
    this.valueNumber=value;
  }

}
