import { Component, OnInit } from '@angular/core';
import { PokeService } from '../services/poke.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Pokemon } from '../pokemon';
import { basicDetails, pokeimages } from '../models/pokemodel';
///import { pokeDeets } from '../models/pokemodel';
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
  //pokedeets: pokeDeets | undefined;
  pokeBasicDetails: basicDetails | undefined;
  pokemonImages: pokeimages | undefined;
  unsubscribe$ = new Subject<void>();


 
  ngOnInit(): void {
    this.getPokemonDetails();

  }

  getPokemonDetails(): void {

    let name = this.route.snapshot.paramMap.get('name') ?? "";
    this.pokeService.getDetails(name).subscribe(basicDetails => {this.pokeBasicDetails = basicDetails
      console.log(basicDetails)})

  }

  backClicked(): void{
    this.location.back();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

  }


}
