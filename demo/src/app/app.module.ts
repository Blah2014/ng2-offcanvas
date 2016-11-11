import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { Ng2OffcanvasModule } from '../../../lib/ng2-offcanvas';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2OffcanvasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
