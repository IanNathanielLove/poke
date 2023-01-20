import { Injectable, LOCALE_ID } from '@angular/core';
import {concatMap, map, Observable, of, zip, tap } from 'rxjs'
import {  moves, pokeimages, pokemodel, pokemodelPage, pokemoves, pokeTypes, Pokemon, PokeType } from '../models/pokemodel';
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
        return this.getImages(data.results).pipe(map(pokemonlist => {
          data.results = pokemonlist
          return data
        }
        )) 
      }),
      map((data: any) => {
      let pokeList: pokemodel[] = []
      data.results.forEach((p: any) => {
        let pokemon = new pokemodel(p.name, p.url, p.images, p.types); 
        pokeList.push(pokemon)
      }) 
      return new pokemodelPage(pokeList, page, data.count, limit)     
    }))
  }

  
  

  getByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.pokeUrl}/pokemon/${name}`).pipe(
      map((item: any) => {
        let types = item.types.map((data: any) => {
          return new PokeType(types.type.name)
        })
        return new Pokemon(item.name, item.id, item.base_experience, item.height, item.weight, item.sprites, item.moves, types)
      }))
  }

  getManyByName(pokeList: any[]): Observable<any[]> {
    return zip(...pokeList.map(p => {
      return this.getByName(p.name).pipe(map(pokeObj => {
        return pokeObj
      }))
    }))
  }


//gets data from api for the detail view 
  getDetails(name: string): Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.pokeUrl}/pokemon/${name}`).pipe(
     concatMap((data:any) => {
        return this.getMoves(data.moves).pipe(map(pokemonMovesList => {
          data.moves = pokemonMovesList
          console.log("getMovesList", data)
          return data
        }))
      }),
      map((data: any) => {    
        let types = data.types.map((type: any) => {
          return new PokeType(type.type.name)
        })
        return new Pokemon(data.name, data.id, data.base_experience, data.height, data.weight, data.sprites, data.moves, types);     
    }),
    )
  }



/*
  getMovesArray(name: string): Observable<moves>{
    return this.http.get<moves>(`${this.pokeUrl}/pokemon/${name}`).pipe(map((m: any) => {
      console.log("getEnv", m)
      let pokeList = new moves();
      m.pokemon_species.forEach((pokemon_species: any)=>{
        pokeList.pokemon_species?.push(pokemon_species.name)
      })
      return pokeList
  }))
  }
*/



  getTypeList(type:string[]):Observable<string []>{
    return this.http.get<string []>(`${this.pokeUrl}/type`).pipe(map((data:any)=>{

      let type : string [] = []

      data.results.forEach((p:any) =>{
        type.push(p.name)     
      })

      console.log("array", type)
      return type

    }))
  }


  getNameList(name:string):Observable<string []>{
    return this.http.get<string []>(`${this.pokeUrl}/type/${name}`).pipe(map((data:any)=>{


      let names : string [] = []

      data.pokemon.forEach((p:any) => {
        names.push(p.pokemon.name)

      })

      console.log("getNameList", names)
      return names



    }))
  }


  getType(name: string): Observable<pokeTypes>{
    return this.http.get<pokeTypes>(`${this.pokeUrl}/type/${name}`).pipe(map((data:any)=> {
      let type = new pokeTypes(data.name);
      return type;
    }))
  }

  getTypes(types: any[]):Observable<any>{
    return zip(...types.map(p => {
      console.log("getType", p)
      return this.getType(p.type.name).pipe(map(pokeUrl => {
        p.type.name = pokeUrl
        return p;
      }))
    }))
  }




  getMove(name: string): Observable<pokemoves>{
    return this.http.get<pokemoves>(`${this.pokeUrl}/move/${name}`).pipe(map((data: any)=>{
      return new pokemoves(data.name, data.power);
    }))
  }

  getMoves(moves: any[]): Observable<any>{
    return zip(...moves.map(p => {
      return this.getMove(p.move.name)
    }))
  }



  getImage(name: string): Observable<pokeimages>{
    return this.http.get<pokeimages>(`${this.pokeUrl}/pokemon/${name}`).pipe(map((data: any)=>{
      return new pokeimages(data.sprites.front_default, data.sprites.back_default);
    }))
  }

  getImages(pokelist: any[]):Observable<any[]>{
    return zip(...pokelist.map(p => {
      return this.getImage(p.name).pipe(map(pokeUrl => {
        p.images = pokeUrl
        return p
      }))
    }))

  }

/*
  filterByType(type: string) {
    return this.http.get(`${this.pokeUrl}/type/${type}`).pipe(map((item: any) => {
      let pokenameList = new po;
      item.pokemon.forEach((pokemon: any) => {
        pokenameList.pokemonOfType?.push(pokemon.pokemon.name);
        //console.log("pokemon name", pokemon.pokemon.name);
      })
      console.log("This is my pokelist", pokenameList);
      return pokenameList;
    }))

/*


  getType(moves: any[]): Observable<Move[]> {
    let returnArr: Observable<Move>[] = []
    for (let i = 0; i < moves.length && i < 5; i++) {
      returnArr.push(
        this.http.get(`${this.baseURL}/move/${moves[i].move.name}`).pipe(map((m: any) => {
          return new Move(m.name, m.accuracy, m.power, m.pp, m.flavor_text_entries[0]?.flavor_text)
        }))
      )
    }
    return zip(returnArr)
  }


  


  get(name: string): Observable<Habitat>{
    return this.http.get<Habitat>(`${this.baseURL}/pokemon-habitat/${name}`).pipe(map((m: any) => {
      console.log("getEnv", m)
      let pokeList = new Habitat();
      m.pokemon_species.forEach((pokemon_species: any)=>{
        pokeList.pokemon_species?.push(pokemon_species.name)
      })
      return pokeList
  }))
  }
  */


  
}