import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Observable, observable, Subject, Subscription, takeUntil } from 'rxjs';
import { PokeService } from '../services/poke.service';
import { Pokemon } from '../pokemon';
import { pokeimages, pokemodel, pokemodelPage } from '../models/pokemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleCardComponent } from '../single-card/single-card.component';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})


export class ListComponent implements OnInit{

  pokemonPageSub!: Subscription;
  pokemonPage?: pokemodelPage;
  unsubscribe$ = new Subject<void>(); 
  //pokeImages: pokeimages | undefined;
  pagination!: {nextLink?: string, prevLink?: string, currentPage: number} 


  constructor(private pokeSerice: PokeService,
              private route: ActivatedRoute,
              private router: Router
              ){}


  ngOnInit(): void {
    let page = Number(this.route.snapshot.queryParamMap.get("page") ?? "1");
    this.pagination = {currentPage: page}
    this.getPokemany(page);
    console.log(page); 
 
  }

  getPokemany(page?: number, limit?: number){
    this.router.navigate(["."], {queryParams: {page}})   
    this.pokemonPageSub = this.pokeSerice.getPokemon(page, limit).pipe(takeUntil(this.unsubscribe$))
      .subscribe(pokemonPage => {
        this.pokemonPage = pokemonPage
      })   
  }
  

  loadNext(){ 
    this.getPokemany(this.pokemonPage!.currentPage+1, this.pokemonPage?.limit)
  }

  loadPrev(){
    this.getPokemany(this.pokemonPage!.currentPage-1, this.pokemonPage?.limit)
  }


  ngOnDestroy(){
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
