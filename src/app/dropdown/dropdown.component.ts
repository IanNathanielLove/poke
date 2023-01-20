import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Observable, observable, Subject, Subscription, takeUntil } from 'rxjs';
import { PokeService } from '../services/poke.service';
import { pokeimages, pokemodel, pokemodelPage, Pokemon, pokeTypes } from '../models/pokemodel';
import { ActivatedRoute, Router } from '@angular/router';
import { SingleCardComponent } from '../single-card/single-card.component';



@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {

  pokemon: Pokemon | undefined;
  types: string [] = [];
  names: string [] =[];
  typeInput: string = ("");
  nameInput: string =("");
  loadComponent = false;
  

  pokemonPageSub!: Subscription;
  pokemonPage?: pokemodelPage;
  unsubscribe$ = new Subject<void>();
  



  constructor(private pokeSerice: PokeService,
    private route: ActivatedRoute,
    private router: Router
    ){}


  

    ngOnInit(){
      this.getTypes(this.types)
      //this.getNames(this.names, this.name)
      //this.onSelect(this.names)

    }

    getTypes(types: string[]):void{
      this.pokeSerice.getTypeList(types).pipe(takeUntil(this.unsubscribe$))
        .subscribe(types => {this.types = types})     
    }

    getNames(): void{
      this.pokeSerice.getNameList(this.typeInput).pipe(takeUntil(this.unsubscribe$))
        .subscribe(names => {this.names = names;    console.log(names)})  
            
    }


    loadMyChildComponent() {
      
      return this.nameInput
      this.loadComponent = true;


      
    }


    
  
  //  onSelect(: string): void {
    //  this.name = this.searchTerm$.next(term)
    //}
    
}
