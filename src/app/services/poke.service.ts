import { Injectable, LOCALE_ID } from '@angular/core';
import {map, Observable, of } from 'rxjs'
import { Pokemon } from '../pokemon';
import pokeData  from '../../pokemon.json'

@Injectable({
  providedIn: 'root'
})


export class PokeService {

  constructor() { }

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

}


