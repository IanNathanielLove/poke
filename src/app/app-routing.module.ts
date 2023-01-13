import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokeService } from './services/poke.service';

const routes: Routes = [
  {path: '', component: ListComponent},
  {path: 'detail/:name', component: PokemonDetailsComponent},
  {path: 'list/:number', component: ListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
