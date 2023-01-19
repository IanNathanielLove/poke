import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Observable, observable, Subject, Subscription, takeUntil } from 'rxjs';
import { PokeService } from '../services/poke.service';
import { Pokemon } from '../pokemon';
import { pokeimages, pokemodel, pokemodelPage } from '../models/pokemodel';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.scss']
})
export class SingleCardComponent {

  constructor(private pokeSerice: PokeService,
              private route: ActivatedRoute,
              private router: Router

              ){
    
}

  @Input() data!: pokemodel;


  @HostBinding('style.--type1') type1: string = ''
  @HostBinding('style.--type2') type2: string = ''

  
  pokemonPageSub!: Subscription;
  pokemonPage?: pokemodelPage;
  unsubscribe$ = new Subject<void>(); 
  pokeImages: pokeimages | undefined;
  pagination!: {nextLink?: string, prevLink?: string, currentPage: number} 

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
