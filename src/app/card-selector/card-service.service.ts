import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { CalculatorComponentValue } from './calculator-response.model';
import { Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';

@Injectable({ providedIn: 'root' })
export class cardService {

    
    equal: CalculatorComponentValue = null;
    floor: CalculatorComponentValue = null;
    ceil: CalculatorComponentValue = null;
    equalSelect = new Subject<CalculatorComponentValue>();
    ceilSelect = new Subject<CalculatorComponentValue>();
    floorSelect = new Subject<CalculatorComponentValue>();

    constructor(private http: HttpClient) { }

    purchaseRequest(amount: number) {
        this.reset();
        return this.http.get<any>("http://ec2-13-58-250-2.us-east-2.compute.amazonaws.com:3000/shop/5/search-combination", {
            params: new HttpParams().set("amount", amount.toString())
        }).pipe(tap(
            (response) => {
                for (let key in response) {
                    if (response.hasOwnProperty(key)) {
                        if (key === "equal") {
                            this.equal = response[key];
                        }
                        if (key === "ceil") {
                            this.ceil = response[key];
                        }
                        if (key === "floor") {
                            this.floor = response[key];
                        }
                        this.emit();
                    }
                }
            }
        ), catchError(
            (err) => {
                console.log(err);
                return err;
            }
        ));
    }

    simpleSearch(amount: number) {
        this.reset();
        return this.http.get<any>("http://ec2-13-58-250-2.us-east-2.compute.amazonaws.com:3000/shop/5/search-combination", {
            params: new HttpParams().set("amount", amount.toString())
        }).pipe(tap(
            (response) => {
                for (let key in response) {
                    if (response.hasOwnProperty(key)) {
                        if (key === "equal") {
                            this.equal = response[key];
                        }
                        if (key === "ceil") {
                            this.ceil = response[key];
                        }
                        if (key === "floor") {
                            this.floor = response[key];
                        }
                    }
                }
            }
        ), catchError(
            (err) => {
                console.log(err.message);
                return err;
            }
        ));
    }

    nextValid(amount) {
        this.reset();
        amount = amount + 1;
        this.simpleSearch(amount).subscribe(
            (data) => {
                if (this.equal !== null) {
                    this.equalSelect.next(this.equal);
                } else if (this.ceil !== null) {
                    this.equalSelect.next(this.ceil);
                }
            }
        );
    }

    prevValid(amount) {
        amount = amount - 1;
        this.simpleSearch(amount).subscribe(
            (data) => {
                if (this.equal !== null) {
                    this.equalSelect.next(this.equal);
                } else if (this.floor !== null) {
                    this.equalSelect.next(this.floor);
                }
            }
        );
    }

    private reset() {
        this.equal = null;
        this.floor = null;
        this.ceil = null;
    }

    private emit() {
        this.ceilSelect.next(this.ceil);
        this.equalSelect.next(this.equal);
        this.floorSelect.next(this.floor);
    }
}