import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SingleCardComponent } from './single-card/single-card.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    PokemonDetailsComponent,
    PaginationComponent,
    SingleCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
