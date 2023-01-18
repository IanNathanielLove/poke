import { Injectable, LOCALE_ID } from '@angular/core';
import {concatMap, map, Observable, of, zip, tap } from 'rxjs'
import {  pokeimages, pokemodel, pokemodelPage, pokemoves, basicDetails, pokeTypes, pokeDeets } from '../models/pokemodel';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})


export class PokeService {



  constructor(private http:HttpClient) { }

  private pokeUrl = 'https://pokeapi.co/api/v2';



// method for getting pokemon to list view
  getPokemon(page: number = 1 , limit: number = 20):Observable<pokemodelPage>{
    let offset = (page - 1) * limit; 
    return this.http.get(`${this.pokeUrl}/pokemon`, {params: {offset, limit}}).pipe(
      concatMap((data:any) => {
        return this.getManyImages(data.results).pipe(map(pokemonlist => {
          data.results = pokemonlist
          return data
        }
        )) 
      }),  
      map((data: any) => {
      let pokemon = data.results.map((p: any) => {
        return new pokemodel(p.name, p.url, p.images); 
      }) 
      return new pokemodelPage(pokemon, page, data.count, limit)     
    }))
  }




//gets data from api for the detail view 
  getDetails(name: string): Observable<pokeDeets>{
    return this.http.get<pokeDeets>(`${this.pokeUrl}/pokemon/${name}`).pipe(
     concatMap((data:any) => {
        return this.getMovesList(data.moves).pipe(map(pokemonMovesList => {
          data.moves = pokemonMovesList
          console.log("getMovesList", data)
          console.log("moves", data.moves);
          return data
        }))
      }),
      map((data: any) => {    
        return new pokeDeets(data.name, data.id, data.base_experience, data.height, data.weight, data.sprites, data.moves);
    }),
    )
  }





  getType(name: string): Observable<pokeTypes>{
    return this.http.get<pokeTypes>(`${this.pokeUrl}/type/${name}`).pipe(map((data:any)=> {
      let type = new pokeTypes (data.name);
      return type;
    }))

  }

  getTypeList(types: any[]):Observable<any>{
    return zip(...types.map(p => {
      console.log("getType", p)
      return this.getType(p.type.name).pipe(map(pokeUrl => {
        p.type.name = pokeUrl
        return p;
      }))
    }))
  }







  getBasicDetails(name: string): Observable<pokeDeets>{  
      return this.http.get<pokeDeets>(`${this.pokeUrl}/pokemon/${name}`).pipe(map((data: any)=> {
        let basic = new pokeDeets(data.name, data.id, data.base_experience, data.height, data.weight, data.images, data.moves);
        return basic;
      }))
  }


  getBulkDetails(pokelist: any[]):Observable<any>{
   return zip(...pokelist.map(p => {
    return this.getBasicDetails(p.name).pipe(map(pokeUrl => {
      p.images = pokeUrl
      return p
    }))
   }))
  }







  getMove(name: string): Observable<pokemoves>{
    return this.http.get<pokemoves>(`${this.pokeUrl}/move/${name}`).pipe(map((data: any)=>{
      return new pokemoves(data.name, data.power);
    }))
  }

  getMovesList(moves: any[]): Observable<any>{
    return zip(...moves.map(p => {
      return this.getMove(p.move.name)
    }))
  }






  getImages(name: string): Observable<pokeimages>{
    return this.http.get<pokeimages>(`${this.pokeUrl}/pokemon/${name}`).pipe(map((data: any)=>{
      return new pokeimages(data.sprites.front_default, data.sprites.back_default);
    }))
  }

  getManyImages(pokelist: any[]):Observable<any[]>{
    //... ! spread operator
    console.log("getManyImages", pokelist)
    return zip(...pokelist.map(p => {
      return this.getImages(p.name).pipe(map(pokeUrl => {
        p.images = pokeUrl
        return p
      }))
    }))

  }


  
}