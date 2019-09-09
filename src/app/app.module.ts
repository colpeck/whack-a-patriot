import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { StartComponent } from './start/start.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    StartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpYkIaaaMuSvo9Y_CRDvOHG6WBwm3WLT4'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
