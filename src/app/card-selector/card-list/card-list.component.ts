import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { CalculatorComponentValue } from '../calculator-response.model';
import { cardService } from '../card-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit, OnDestroy {
  cards : CalculatorComponentValue = null;
  ceil : CalculatorComponentValue = null;
  floor : CalculatorComponentValue = null;
  @Output() valueSelect = new EventEmitter<number>();
  touched:boolean = false;
  cSubscription : Subscription;
  eSubscription : Subscription;
  fSubscription : Subscription;

  constructor(private cardService: cardService) { }

  ngOnInit(): void {
    this.subscribeInit();
  }

  private subscribeInit(){
   this.eSubscription = this.cardService.equalSelect.subscribe(
      (cards : CalculatorComponentValue)=>{
        this.cards = cards;
        this.touched=true;
        if(this.cards!==null){
          this.valueSelect.emit(this.cards.value);
        }
      }
    );

   this.cSubscription = this.cardService.ceilSelect.subscribe(
      (ceil : CalculatorComponentValue)=>{
        this.ceil = ceil;
        this.touched=true;
      }
    );

   this.fSubscription = this.cardService.floorSelect.subscribe(
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

  ngOnDestroy(){
    this.cSubscription.unsubscribe();
    this.eSubscription.unsubscribe();
    this.fSubscription.unsubscribe();
  }

}