import { Injectable, LOCALE_ID } from '@angular/core';
import {map, Observable, of } from 'rxjs'
import { Pokemon } from '../pokemon';
import pokeData  from '../../pokemon.json'
import { pokeDeets, pokeimages, pokemodel, pokemodelPage } from '../models/pokemodel';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})


export class PokeService {



  constructor(private http:HttpClient) { }
  private pokeUrl = 'https://pokeapi.co/api/v2';

  getPokemon(page: number = 1 , limit: number = 20):Observable<pokemodelPage>{
    let offset = (page - 1) * limit;
    return this.http.get(`${this.pokeUrl}/pokemon`, {params: {offset, limit}}).pipe(map((data: any) => {
      console.log(data);
      let pokemon = data.results.map((p: any) => {
        return new pokemodel(p.name, p.url); 
      }) 
      return new pokemodelPage(pokemon, page, data.count, limit)     
    }))
  }



  getAll(){
  return of(pokeData);
  }



  getById(id: number): Observable<any>{
  return of(pokeData).pipe(
    map(all => {
      return all.find(p => p.id ==id)
    })
  )
  }

  getImages(name: string): Observable<pokeimages>{
    return this.http.get<pokeimages>(`${this.pokeUrl}/pokemon/${name}`).pipe(map((data: any)=>{
      return new pokeimages(data.sprites.front_default, data.sprites.back_default);
    }))
  }


  getDetails(name: string): Observable <pokeDeets>{
    return this.http.get<pokeDeets>(`${this.pokeUrl}/pokemon/${name}`).pipe(map((data: any) => {
      return new pokeDeets(data.name, data.id, data.base_experience, data.height, data.weight, data.sprites.front_default);
      //console.log(data);
    }))
  }
}


