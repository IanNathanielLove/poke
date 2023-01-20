import { Component, Input, OnInit } from '@angular/core';
import { PokeService } from '../services/poke.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { moves, pokeimages, pokemoves } from '../models/pokemodel';
import { Pokemon } from '../models/pokemodel';
import { Subject, Subscription } from 'rxjs';



@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.scss']
})
export class MovesComponent {

  @Input() moves!: pokemoves[]
  move!: pokemoves
  pagination!: {nextLink?: string, prevLink?: string, currentPage: number} 


  index: number=1;
  lastpage: boolean=false;
  pokemonDeatailsSub!: Subscription;
  pokedeets: Pokemon | undefined;
  //pokeMoves: moves | undefined;
  pokemonImages: pokeimages | undefined;
  unsubscribe$ = new Subject<void>();

  constructor(
    private pokeService: PokeService,
    private route: ActivatedRoute,
    private router: Router){}


    ngOnInit(): void{
      //this.getPokemonMoves();
      this.loadNext()
      this.loadPrev()
      console.log(this.moves)
    }

    loadNext(): void{ 
      this.index++
      if (this.index + 1 == this.moves.length){
        console.log(this.index)
        this.lastpage = true
      }
      this.move = this.moves[this.index]
    }

    loadPrev(){
      this.index--
      this.lastpage = false  
    }

    ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }

}
