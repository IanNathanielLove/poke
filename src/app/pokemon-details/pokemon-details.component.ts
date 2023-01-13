import { Component, OnInit } from '@angular/core';
import { PokeService } from '../services/poke.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Pokemon } from '../pokemon';
import { pokeDeets } from '../models/pokemodel';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})

export class PokemonDetailsComponent implements OnInit{

  constructor(private pokeService: PokeService, 
              private location: Location, 
              private route: ActivatedRoute){
  }

  pokedeets: pokeDeets | undefined;

 
  ngOnInit(): void {
    this.getPokemonDetails();

  }

  //getPokemonDetails(): void{
    //const id = Number(this.route.snapshot.paramMap.get('id'));
    //this.pokeService.getById(id)
    //.subscribe(pokemon => this.pokemons = pokemon);
  //}

  getPokemonDetails(): void {
    let name = this.route.snapshot.paramMap.get('name') ?? "";
    this.pokeService.getDetails(name).subscribe(pokedeets => this.pokedeets = pokedeets)
  }

  //backClicked(){
    //let backClick = this.route.snapshot.queryParamMap.get()
   
  //}


}
