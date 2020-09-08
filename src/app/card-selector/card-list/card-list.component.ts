import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CalculatorComponentValue } from '../calculator-response.model';
import { cardService } from '../card-service.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  cards : CalculatorComponentValue = null;
  ceil : CalculatorComponentValue = null;
  floor : CalculatorComponentValue = null;
  @Output() valueSelect = new EventEmitter<number>();
  touched:boolean = false;

  constructor(private cardService: cardService) { }

  ngOnInit(): void {
    this.subscribeInit();
  }

  private subscribeInit(){
    this.cardService.equalSelect.subscribe(
      (cards : CalculatorComponentValue)=>{
        this.cards = cards;
        this.touched=true;
        if(this.cards!==null){
          this.valueSelect.emit(this.cards.value);
        }
      }
    );

    this.cardService.ceilSelect.subscribe(
      (ceil : CalculatorComponentValue)=>{
        this.ceil = ceil;
        this.touched=true;
      }
    );

    this.cardService.floorSelect.subscribe(
      (floor : CalculatorComponentValue)=>{
        this.floor = floor;
        this.touched=true;
      }
    );
  }

  onCeilValueSelect(){
    this.valueSelect.emit(this.ceil.value);
  }

  onFloorValueSelect(){
    this.valueSelect.emit(this.floor.value);
  }

}