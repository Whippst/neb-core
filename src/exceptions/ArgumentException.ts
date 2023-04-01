export class ArgumentException extends Error{
    constructor(message? : string){
        if(!message){
            super("Invalid Argument Provided");
        }
        else{
            super(message);
        }
    }
}