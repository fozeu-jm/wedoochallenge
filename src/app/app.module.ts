import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CardSelectorComponent } from './card-selector/card-selector.component';
import { SelectorEditComponent } from './card-selector/selector-edit/selector-edit.component';
import { CardListComponent } from './card-selector/card-list/card-list.component';
import { CardItemComponent } from './card-selector/card-list/card-item/card-item.component';
import {RequestInterceptor} from './request-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardSelectorComponent,
    SelectorEditComponent,
    CardListComponent,
    CardItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
