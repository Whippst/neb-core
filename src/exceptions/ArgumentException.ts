export class ArgumentException {
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