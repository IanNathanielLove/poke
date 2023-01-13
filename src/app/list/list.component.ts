import { Component, Input, OnInit } from '@angular/core';
import { observable } from 'rxjs';
import { PokeService } from '../services/poke.service';
import { Pokemon } from '../pokemon';
import { pokeimages, pokemodel, pokemodelPage } from '../models/pokemodel';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})


export class ListComponent implements OnInit{

  constructor(private pokeSerice: PokeService,
              private route: ActivatedRoute){
    
}

  pokemonPage?: pokemodelPage;
  pokeImages: pokeimages | undefined;
  pagination!: {nextLink?: string, prevLink?: string, currentPage: number} 

  ngOnInit(): void {
    let pageNum = Number(this.route.snapshot.queryParamMap.get("page") ?? "1");
    this.pagination = {currentPage: pageNum}
    this.getPokemany(pageNum);
    
   

  }


  getPokeImages(){
    for(let pokemon of this.pokemonPage!.pokelist){
      console.log(pokemon.name);
      this.pokeSerice.getImages(pokemon.name)
      .subscribe(pokeImages => pokemon.images = pokeImages)
    }
  }


  getPokemany(page?: number, limit?: number){
    this.pokeSerice.getPokemon(page, limit)
      .subscribe(pokemonPage => {
        this.pokemonPage = pokemonPage
          this.getPokeImages()
      })   
  }


  loadNext(){ 
    
    this.getPokemany(this.pokemonPage!.currentPage+1, this.pokemonPage?.limit)

  }

  loadPrev(){

    
    this.getPokemany(this.pokemonPage!.currentPage-1, this.pokemonPage?.limit)
  }


 



}
