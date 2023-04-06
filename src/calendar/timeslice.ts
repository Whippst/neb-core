import { ArgumentException } from "exceptions/ArgumentException";
import { Moment, Period, Instant, MomentType } from "./moment"
import { isEqual, addDays } from "date-fns";


export class TimeSlice{
    private _momentList : Array<Moment>;
    private _parent : Moment;
    constructor(momentList : Array<Moment>){
        if(momentList.length == 0) 
            throw new ArgumentException("Moment list cannot be empty.")
        this._validateParent(momentList)

        this._momentList = new Array<Moment>();
        momentList.forEach(m => this._momentList.push(m));
        this._momentList.sort((m1, m2) => {
            if (m1.before(m2)) return -1;
            if ((m2.before(m1))) return 1;
            return 0;
        })
        this._parent = this._momentList[0].parent as Moment;
        this._validateRange();
    }

    private _validateParent(list : Array<Moment>){
        let commonParent = list[0].parent;
        if(!commonParent)
            throw new ArgumentException("Moments must have a common parent.")

        let result = list.every(m => m.parent == commonParent);
        if(!result)
            throw new ArgumentException("Moments must have a common parent.")
    }

    private _validateRange(){
        if(!isEqual(this.first.startsAt, this._parent.startsAt))
            throw new ArgumentException("All of parent range must be filled.")

        if(this._parent.isOpenEnded){
            if(!this.last.isOpenEnded)
                throw new ArgumentException("All of parent range must be filled.")
        }
        else{
            if(!isEqual(this.last.endsAt as Date, this._parent.endsAt as Date))
                throw new ArgumentException("All of parent range must be filled.")
        }

        let listRef = this._momentList;
        for (let i = 0, j = 1; j < this.length; i++, j++){
            if(!isEqual(addDays(listRef[i].endsAt as Date, 1), listRef[j].startsAt))
                throw new ArgumentException("Moments must be contiguous.")
        }
    }

    get length () : number{
        return this._momentList.length;
    }

    get(index : number) : Moment{
        if(index < 0 || index > this.length -1)
            throw new RangeError();
        return this._momentList[index];
    }

    get first() : Moment{
        return this._momentList[0];
    }

    get last() : Moment{
        return this._momentList[this.length-1]
    }

    getCorresponding(selection : Date | Moment | Instant) : Moment | undefined{

        if(selection instanceof Moment)
            selection.type == MomentType.Duration ?selection = new Moment(selection.startsAt) : selection;
        else{
            selection = new Moment(selection);
        }

        if (selection.before(this.first) || selection.after(this.last))
            return undefined;    

        return this._momentList.find(m => m.overlaps(selection as Moment))
    }

    getCorrespondingRange(selection : Period | Moment ) : Array<Moment> {
        if(selection instanceof Period){
            selection = new Moment(selection);
        }

        return this._momentList.filter(x => x.overlaps(selection as Moment));
    }
}