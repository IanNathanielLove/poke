export interface Pokemon{
    name : string 
    elementType : string,
    id : number,
    weightLb : number,
    moveSet : string[]
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

    constructor(name: string, url: string, images?: pokeimages ) {
        this.name = name;
        this.url = url;
        this.images = images;
    }
}

export class pokeDeets{
    
    name: string;
    id: number;
    base_experience : number;
    height : number;
    weight : number;
    front_default : string;
    


    constructor(name: string, id: number, basexp: number, height: number, weight: number, front_default : string){
        this.name = name;
        this.id = id;
        this.base_experience= basexp;
        this.height = height;
        this.weight = weight;
        this.front_default = front_default;
    }

}

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