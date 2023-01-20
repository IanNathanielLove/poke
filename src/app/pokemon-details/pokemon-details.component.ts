import { Component, Input, OnInit } from '@angular/core';
import { PokeService } from '../services/poke.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { pokeimages } from '../models/pokemodel';
import { Pokemon} from '../models/pokemodel';
import { Subject, Subscription } from 'rxjs';

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


  pokemonDeatailsSub!: Subscription;
  pokedeets: Pokemon | undefined;
  pokemonImages: pokeimages | undefined;
  unsubscribe$ = new Subject<void>();

  @Input() pokemonName!: string;

  @Input() data!: Pokemon;
 
  ngOnInit(): void {
    this.getPokemonDetails();

  }

  getPokemonDetails(): void {
    //let name = this.route.snapshot.paramMap.get('name') ?? "";
    console.log("getPokemonDetails", this.pokemonName)
    this.pokeService.getDetails(this.pokemonName).subscribe(pokedeets => {this.pokedeets = pokedeets})
  }

  

  backClicked(): void{
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

  }


}