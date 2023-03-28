import { Exception } from "./Exception";
export class ArgumentException implements Exception{
    private _message : string;
    constructor(message? : string){
        if(!message){
            this._message = "Invalid Argument Provided";
        }
        else{
            this._message = message;
        }
    }

    get message() : string{
        return this._message;
    }
}