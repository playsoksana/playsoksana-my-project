import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';




@NgModule({
  declarations: [
    AppComponent, 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule.forRoot(),
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
