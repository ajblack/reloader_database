import {Deserializable} from "./deserializable.model";

export class Load implements Deserializable {
    owner: string;
    name:string;
    caliber:string;
    bulletWeight:number;
    bulletType:string;
    powderWeight:number;
    powderType:string;
    oal:number;
    primer:string;
    notes:string[];


    deserialize(input:any){
      Object.assign(this, input);
        return this;

    }
}
