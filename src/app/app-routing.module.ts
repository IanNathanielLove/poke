import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ListComponent } from './list/list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PokeService } from './services/poke.service';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'detail/:name', component: PokemonDetailsComponent},
  {path: 'list', component: ListComponent},
  {path: 'dropdown', component: DropdownComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
