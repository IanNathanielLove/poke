import { Component, Input, OnInit } from '@angular/core';
import { observable } from 'rxjs';
import { PokeService } from '../services/poke.service';
import { Pokemon } from '../pokemon';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{

  constructor(private pokeSerice: PokeService){
}

  pokemons : Pokemon [] = [];

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon(){
    this.pokeSerice.getAll()
      .subscribe(pokemons => this.pokemons = pokemons)
  }


}
