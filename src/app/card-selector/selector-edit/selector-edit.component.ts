import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { cardService } from '../card-service.service';

@Component({
  selector: 'app-selector-edit',
  templateUrl: './selector-edit.component.html',
  styleUrls: ['./selector-edit.component.css']
})
export class SelectorEditComponent implements OnInit {
  selectorForm: FormGroup;
  @Input() value: number;
  @Output() valueSubmit = new EventEmitter<number>();

  constructor(private cardService: cardService) { }

  ngOnInit(): void {
    this.initForm();
    this.selectorForm.patchValue({ amount: this.value });
  }

  private initForm() {
    this.selectorForm = new FormGroup({
      'amount': new FormControl(this.value, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });


  }

  onSubmit() {
    if (!this.selectorForm.valid) {
      return;
    }
    this.valueSubmit.emit(this.selectorForm.value.amount);
    this.cardService.purchaseRequest(this.selectorForm.value.amount).subscribe();
  }

  nextValidAmount() {
    let value = this.selectorForm.value.amount;
    if (value === undefined) {
      value = 0;
    }
    this.cardService.nextValid(+value);
  }

  prevValidAmount() {
    let value = this.selectorForm.value.amount;
    if (value === undefined) {
      value = 0;
    }
    this.cardService.prevValid(+value);
  }


}
