

export class pokemodelPage{

    pokelist: pokemodel [];
    currentPage: number;
    count: number;
    limit: number;


    constructor(pokelist: pokemodel [], currentPage: number, count: number, limit: number){

        this.pokelist = pokelist;
        this.currentPage = currentPage;
        this.count = count;
        this.limit = limit;


    }
}


export class pokemodel{

    name : string;
    url: string;
    images? : pokeimages
    type?: pokeTypes[]

    constructor(name: string, url: string, 
        images?: pokeimages, type?: pokeTypes
         ) {
        this.name = name;
        this.url = url;
        this.images = images;
        this.type = this.type;
    }
}




export class pokeTypes{
    name: string;
    
    constructor(name: string){
        this.name = name;
    }
}






export class Pokemon {
    
    name: string;
    id: number;
    height : number;
    weight : number;
    base_experience: number;
    moves: pokemoves [];
    types?: pokeTypes [];
    sprites?: pokeimages;
    
    constructor(name: string, id: number, base_experience: number, height: number, weight: number, sprites: pokeimages, moves: pokemoves[], types: pokeTypes[] ){
        
        this.moves = moves;
        this.name = name;
        this.id = id;
        this.base_experience= base_experience;
        this.height = height;
        this.weight = weight;
        this.sprites = sprites;
        this.types = types;
    }
}


export class pokemoves{
    name: string;
    power: number;

    constructor(name: string, power: number){
        this.name = name;
        this.power = power;
    }
}


export class pokeimages{

    front_default : string;
    back_default : string; 

    constructor(front_default: string, back_default: string){
        this.front_default = front_default;
        this.back_default = back_default; 
    }

}


export class moves {

   
    moves: string[];

    constructor( moves: string[] = []){  
        this.moves = moves;
    }
}




export class PokeType {
    private pokeColors: any = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        electric: '#F8D030',
        grass: '#78C850',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC'
    }

    private pokeColorsDark: any = {
        normal: '#6D6D4E',
        fire: '#9C531F',
        water: '#445E9C',
        electric: '#A1871F',
        grass: '#4E8234',
        ice: '#638D8D',
        fighting: '#7D1F1A',
        poison: '#682A68',
        ground: '#927D44',
        flying: '#6D5E9C',
        psychic: '#A13959',
        bug: '#6D7815',
        rock: '#786824',
        ghost: '#493963',
        dragon: '#4924A1',
        dark: '#49392F',
        steel: '#787887',
        fairy: '#9B6470'
    }

    name: string
    color: string
    darkColor: string

    constructor(n: string) {
        let key = n as keyof typeof this.pokeColors
        this.name = n
        this.color = this.pokeColors[key]
        this.darkColor = this.pokeColorsDark[key]
    }
}

