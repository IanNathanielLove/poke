export class pokemoves{
    name: string;
    power: number;

    constructor(name: string, power: number){
        this.name = name;
        this.power = power;
    }
}


export class pokeTypes{
    name: string;
    
    constructor(name: string){
        this.name = name;
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


export class pokemodel{

    name : string;
    url: string;
    images? : pokeimages

    constructor(name: string, url: string, 
        images?: pokeimages
         ) {
        this.name = name;
        this.url = url;
        this.images = images;
    }
}


export class basicDetails{
    
    name: string;
    id: number;
    height : number;
    weight : number;
    moves?: pokemoves [];
    types?: pokeTypes [];
    images: pokeimages;

 

    constructor(name: string, id: number,height: number, weight: number, moves: pokemoves[], types: pokeTypes[], images: pokeimages){
        

        this.name = name;
        this.id = id;
        this.height = height;
        this.weight = weight;
        this.moves = moves;
        this.types = types;
        this.images = images;
       
    }
}

/*
export class pokeDeets{
    
    name: string;
    id: number;
    height : number;
    weight : number;
    moves: pokemoves [];
    images?: pokeimages [];

    


    constructor(name: string, id: number, basexp: number, height: number, weight: number, images: pokeimages[], moves: pokemoves[] ){
        
        this.moves = moves;
        this.name = name;
        this.id = id;
        this.base_experience= basexp;
        this.height = height;
        this.weight = weight;
        this.images = images;
    }

}
*/

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